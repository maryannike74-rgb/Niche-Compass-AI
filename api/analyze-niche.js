// Vercel Serverless Function - Handles Claude API calls securely
// This keeps your API key safe (not exposed to browser)

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nicheIdea, responses } = req.body;

  if (!nicheIdea) {
    return res.status(400).json({ error: 'Niche idea is required' });
  }

  // Get API key from environment variable (secure!)
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    console.error('Missing ANTHROPIC_API_KEY environment variable');
    return res.status(500).json({ 
      error: 'API configuration error',
      useMock: true // Tell frontend to use mock analysis
    });
  }

  try {
    // Build the strategic prompt
    const prompt = `You are a senior YouTube strategist analyzing niches for automation channels. Provide a comprehensive PREMIUM analysis worth $100+.

NICHE: ${nicheIdea}
Context: ${responses.faceOrFaceless || 'Not specified'} | ${responses.goal || 'Not specified'} | ${responses.contentStyle || 'Not specified'}

CRITICAL INSTRUCTIONS:
1. Think strategically like a professional consultant
2. Generate SPECIFIC video ideas, not templates
3. Never use "[Niche Name] + generic template" format
4. Each video idea should be unique and strategic
5. Think about what would actually go viral for THIS specific niche

Return ONLY valid JSON with this EXACT structure:
{
  "executiveSummary": "<3-paragraph professional strategic overview>",
  "overallScore": <0-100>,
  "verdict": "<Green Light|Yellow Light|Red Light|Hidden Gem|Crowded But Profitable>",
  "scores": {
    "demand": <0-10>,
    "monetization": <0-10>,
    "competition": <0-10>,
    "facelessFit": <0-10>,
    "contentSupply": <0-10>,
    "differentiation": <0-10>,
    "safetyScore": <0-10>
  },
  "positioning": "<specific strategic positioning for this niche>",
  "targetAudience": "<hyper-specific psychological and situational profile>",
  "channelFormat": "<recommended format>",
  "contentPillars": ["<pillar 1>", "<pillar 2>", "<pillar 3>"],
  "videoIdeas": {
    "quickWins": ["<5 SPECIFIC easy first videos with strategic angles - NOT TEMPLATES>"],
    "authorityBuilders": ["<10 SPECIFIC credibility-building videos - NOT TEMPLATES>"],
    "viralPotential": ["<10 SPECIFIC high-growth videos - NOT TEMPLATES>"],
    "evergreen": ["<5 SPECIFIC long-term traffic videos - NOT TEMPLATES>"]
  },
  "competitorAnalysis": [
    {"channel": "<actual channel name>", "subs": "<count>", "strength": "<what they do well>", "gap": "<opportunity>"}
  ],
  "stealThisAngle": {
    "thumbnailStyle": "<proven style with specific example>",
    "titleFormula": "<working formula with specific example>",
    "contentStructure": "<retention strategy>"
  },
  "redFlags": [
    {"severity": "<high|medium|low>", "issue": "<specific warning>", "mitigation": "<how to avoid>"}
  ],
  "contentCalendar": {
    "month1": ["<Week 1 specific upload>", "<Week 2>", "<Week 3>", "<Week 4>"],
    "month2": ["<specific uploads>"],
    "month3": ["<specific uploads>"]
  },
  "thumbnailStrategy": {
    "style": "<specific style recommendation>",
    "colorPalette": "<recommended colors>",
    "faceRecommendation": "<use face: yes/no and why>"
  },
  "voiceFaceCalculator": {
    "voiceNecessity": <0-100>,
    "faceNecessity": <0-100>,
    "personalityInvestment": "<low|medium|high>",
    "reasoning": "<why these scores>"
  },
  "monetizationRoadmap": {
    "month1to3": "<early monetization strategy>",
    "month4to6": "<growth monetization>",
    "month7to12": "<scale monetization>",
    "longTerm": "<ultimate monetization>"
  },
  "launchPlan": {
    "month1": {"focus": "<main goal>", "actions": ["<5-7 specific actions>"]},
    "month2": {"focus": "<main goal>", "actions": ["<5-7 actions>"]},
    "month3": {"focus": "<main goal>", "actions": ["<5-7 actions>"]}
  },
  "finalRecommendation": "<strategic final advice>"
}`;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        temperature: 1,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', errorData);
      return res.status(500).json({ 
        error: 'AI analysis failed',
        useMock: true 
      });
    }

    const data = await response.json();
    
    // Extract the text response
    const textContent = data.content.find(block => block.type === 'text')?.text;
    
    if (!textContent) {
      return res.status(500).json({ 
        error: 'No response from AI',
        useMock: true 
      });
    }

    // Parse the JSON response
    let analysis;
    try {
      // Remove markdown code blocks if present
      const cleanedText = textContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return res.status(500).json({ 
        error: 'Invalid AI response format',
        useMock: true 
      });
    }

    // Return the analysis
    return res.status(200).json({ 
      success: true,
      analysis 
    });

  } catch (error) {
    console.error('Error in analyze-niche:', error);
    return res.status(500).json({ 
      error: 'Server error',
      useMock: true 
    });
  }
}
