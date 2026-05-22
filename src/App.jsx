import React, { useState, useEffect } from 'react';
import { BarChart3, Sparkles, Target, TrendingUp, AlertTriangle, CheckCircle, ChevronRight, Save, ArrowLeft, Zap, Shield, DollarSign, Users, Video, Clock, Star, Award, Calendar, Image, Mic, Eye, ThumbsUp, Flame, Lightbulb, Users2 } from 'lucide-react';

export default function NicheCompassAI() {
  const [view, setView] = useState('landing');
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [savedEvaluations, setSavedEvaluations] = useState([]);

  useEffect(() => { loadSavedEvaluations(); }, []);

  const loadSavedEvaluations = async () => {
    try {
      const result = await window.storage.list('niche-eval:');
      if (result?.keys) {
        const evals = [];
        for (const key of result.keys) {
          const data = await window.storage.get(key);
          if (data?.value) evals.push(JSON.parse(data.value));
        }
        setSavedEvaluations(evals.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      }
    } catch (e) { console.log('No saved evaluations'); }
  };

  const saveEvaluation = async (evaluation) => {
    try {
      await window.storage.set(`niche-eval:${Date.now()}`, JSON.stringify(evaluation));
      await loadSavedEvaluations();
    } catch (e) { console.error('Save failed:', e); }
  };

  const questions = [
    { id: 'nicheIdea', question: 'What is your niche idea?', subtitle: 'Be specific. Instead of "AI tools", try "AI tools for real estate agents"', type: 'textarea', placeholder: 'E.g., Bible stories for young adults, AI automation for small businesses...' },
    { id: 'faceOrFaceless', question: 'Do you want to show your face?', type: 'radio', options: ['Completely faceless', 'Partially (sometimes on camera)', 'Face-focused content'] },
    { id: 'goal', question: 'What is your primary monetization goal?', type: 'radio', options: ['AdSense revenue', 'Affiliate marketing', 'Brand deals & sponsorships', 'Digital products/courses', 'Build authority/personal brand'] },
    { id: 'contentStyle', question: 'What content style fits you best?', type: 'radio', options: ['Educational tutorials', 'Storytelling & narratives', 'Commentary & analysis', 'List videos & rankings', 'Documentary style', 'Short-form only'] },
    { id: 'timeAvailable', question: 'How much time can you dedicate weekly?', type: 'radio', options: ['5-10 hours/week', '10-20 hours/week', '20+ hours/week (full-time)', 'Variable/inconsistent'] },
    { id: 'skillLevel', question: 'What is your content creation skill level?', type: 'radio', options: ['Complete beginner', 'Some experience', 'Intermediate', 'Advanced/Professional'] },
    { id: 'voicePreference', question: 'Voice preference for your channel?', type: 'radio', options: ['My own voice', 'AI voiceover', 'No voiceover (music only)', 'Open to any'] },
    { id: 'researchAbility', question: 'Can you do research for each video?', type: 'radio', options: ['Yes, I enjoy research', 'Moderate research only', 'Prefer minimal research', 'AI-assisted research only'] },
    { id: 'toolBudget', question: 'Monthly budget for tools?', type: 'radio', options: ['$0 (free tools only)', '$50-100', '$100-300', '$300+'] },
    { id: 'biggestConcern', question: 'What is your biggest concern?', type: 'radio', options: ['Not getting views', 'Not making money', 'Getting demonetized', 'Too much competition', 'Running out of content ideas', 'Staying consistent'] }
  ];

  const analyzeNiche = async () => {
    setView('analyzing');
    // For now using mock - will integrate real API
    setTimeout(() => {
      const mockAnalysis = generatePremiumMockAnalysis(responses.nicheIdea);
      const evaluation = { 
        id: Date.now().toString(), 
        timestamp: new Date().toISOString(), 
        nicheIdea: responses.nicheIdea, 
        responses, 
        analysis: mockAnalysis 
      };
      setAnalysis(mockAnalysis);
      saveEvaluation(evaluation);
      setView('results');
    }, 3000);
  };

  const generatePremiumMockAnalysis = (nicheIdea) => {
    const isSpiritual = nicheIdea.toLowerCase().includes('bible') || nicheIdea.toLowerCase().includes('prayer');
    const isAI = nicheIdea.toLowerCase().includes('ai') || nicheIdea.toLowerCase().includes('automation');
    
    if (isSpiritual) {
      return {
        executiveSummary: `This niche represents a high-opportunity Hidden Gem with strong foundational demand and low competition saturation. The market shows consistent search volume for faith-based content reimagined for modern audiences, particularly those aged 22-38 who seek spiritual wisdom without traditional religious framing. Primary revenue streams include high-CPM AdSense ($8-15), faith app partnerships, and digital devotionals. The main risk is maintaining reverence while offering fresh perspectives - successfully navigating this balance positions you as a category leader. Recommended approach: Launch with well-known stories through psychological/strategic lenses, then expand into deeper theological territory once authority is established.`,
        overallScore: 84,
        verdict: "Hidden Gem",
        scores: { demand: 8, monetization: 9, competition: 5, facelessFit: 10, contentSupply: 10, differentiation: 9, safetyScore: 10 },
        positioning: "Modern faith decoder: ancient wisdom through psychology, philosophy, and practical life application for the spiritually curious but institutionally skeptical.",
        targetAudience: "Ages 22-38 who grew up religious but drifted from organized religion. They listen to Jordan Peterson, read Stoicism, scroll philosophy Reddit at 2am, and wonder if biblical wisdom has practical value stripped of dogma. College-educated, values-driven, seeking meaning beyond materialism but allergic to preaching.",
        channelFormat: "Story-driven narratives with modern psychological parallels, minimal visuals, calm professional voiceover, philosophical framing",
        contentPillars: ["Biblical Psychology - ancient stories as case studies in human nature", "Wisdom vs Self-Help - timeless principles vs trendy advice", "Historical Context - what these stories meant in their time vs now"],
        videoIdeas: {
          quickWins: [
            "Why Cain Killed Abel: The Psychology of Envy That Destroys Brothers",
            "The Prodigal Son Isn't About Forgiveness - It's About Resentment",
            "What 'Turn The Other Cheek' Actually Meant (Strategy, Not Weakness)",
            "David vs Goliath: Military Tactics Disguised as Faith",
            "Prayer vs Meditation: I Tested Both for 30 Days, Here's What Worked"
          ],
          authorityBuilders: [
            "The Book of Job Predicted Stoicism 2000 Years Early - Here's How",
            "Why Moses Broke The Tablets: Ancient Rage Management",
            "Solomon's Wisdom Applied To Modern Relationships and Dating",
            "Ecclesiastes: The Most Depressing (And Realistic) Book Ever Written",
            "The Sermon on the Mount as a Complete Life Philosophy",
            "Why Judas Wasn't The Villain: A Historical Perspective",
            "Abraham and Isaac: The Ethics of Unquestioning Obedience",
            "The Tower of Babel: When Ambition Becomes Hubris",
            "Ruth's Story: Ancient Immigration and Loyalty",
            "Daniel in Babylon: Maintaining Identity in Foreign Culture"
          ],
          viralPotential: [
            "I Read The Entire Bible As An Atheist - These 10 Stories Changed My Mind",
            "The Dark Side of Noah's Ark Nobody Talks About",
            "Jesus's Most Controversial Teaching (That Churches Ignore)",
            "Why The Garden of Eden Story Is Actually About Consciousness",
            "The Bible's Weirdest Stories That Sound Like Science Fiction",
            "I Lived By Biblical Principles For 40 Days - Here's What Happened",
            "The Biblical Character Who Out-Suffered Job (And You've Never Heard Of)",
            "Why Adam Blaming Eve Started 4000 Years of Gender Wars",
            "The Real Reason Lot's Wife Turned to Salt (Physics, Not Magic)",
            "Biblical Prophecies That Came True (And The Ones That Didn't)"
          ],
          evergreen: [
            "Complete Beginner's Guide to Understanding The Bible (No Religion Required)",
            "Top 10 Most Misunderstood Bible Verses and What They Really Mean",
            "The Bible's Best Life Advice (From An Agnostic Perspective)",
            "Ancient Biblical Wisdom That Still Works in 2026",
            "How To Read The Bible For Philosophy, Not Religion"
          ]
        },
        competitorAnalysis: [
          { channel: "The Bible Project", subs: "5.2M", strength: "Excellent visual storytelling and theological depth", gap: "Too academic - opportunity for more practical life application" },
          { channel: "BibleThinker", subs: "580K", strength: "Thoughtful biblical analysis", gap: "Traditional Christian framing - space for secular philosophical angle" },
          { channel: "InspiringPhilosophy", subs: "640K", strength: "Philosophy meets faith apologetics", gap: "Defensive tone - opportunity for curious exploration without agenda" }
        ],
        stealThisAngle: {
          thumbnailStyle: "Clean split-screen: classical biblical art on one side, modern psychology diagram/symbol on other. Bold title overlay. Example: Cain/Abel ancient art + brain diagram showing envy neural pathways",
          titleFormula: "[Biblical Figure/Story] + [Unexpected Modern Frame]: The [Surprising Insight] - Examples: 'Moses: Ancient Anger Management', 'Job: Stoicism 2000 Years Early'",
          contentStructure: "Hook with controversial reframe (30sec) → Tell biblical story (2min) → Modern psychological analysis (3min) → Practical takeaway (1min) → Open question for comments"
        },
        redFlags: [
          { severity: "medium", issue: "Theological controversy risk", mitigation: "Frame as philosophical exploration, not religious teaching. Avoid claiming 'THE correct interpretation' - instead say 'one interesting lens'" },
          { severity: "low", issue: "Stock religious imagery overuse", mitigation: "Use classical art + modern graphics. Avoid cliché church stock photos. Mix Michelangelo with infographics" },
          { severity: "medium", issue: "Alienating denominational audiences", mitigation: "Stay theologically neutral. Focus on 'what the text says' and 'what scholars think' rather than denominational doctrine" }
        ],
        contentCalendar: {
          month1: [
            "Week 1: Why Cain Killed Abel (Quick Win - proven interest)",
            "Week 2: David vs Goliath Military Strategy (Quick Win)",
            "Week 3: The Prodigal Son and Resentment (Authority Builder)",
            "Week 4: Prayer vs Meditation Experiment (Quick Win + personal)"
          ],
          month2: [
            "Week 1: Turn The Other Cheek Strategy (Quick Win)",
            "Week 2: Book of Job and Stoicism (Authority Builder)",
            "Week 3: I Read Bible As Atheist (Viral Potential)",
            "Week 4: Dark Side of Noah's Ark (Viral Potential)"
          ],
          month3: [
            "Week 1: Moses Breaking Tablets (Authority Builder)",
            "Week 2: Solomon's Relationship Wisdom (Authority Builder)",
            "Week 3: Judas Wasn't The Villain (Viral Potential)",
            "Week 4: Beginner's Guide to Bible (Evergreen SEO)"
          ]
        },
        thumbnailStrategy: {
          style: "Split-screen philosophical: Classical biblical art meets modern diagrams/symbols. Clean, thought-provoking, not preachy",
          colorPalette: "Earth tones (browns, golds) for ancient side + modern blues/teals for contemporary side. Avoid bright church colors",
          faceRecommendation: "No face needed - maintains universal appeal and avoids personal bias associations. Art + graphics carry the story"
        },
        voiceFaceCalculator: {
          voiceNecessity: 85,
          faceNecessity: 10,
          personalityInvestment: "medium",
          reasoning: "Voice is critical for storytelling flow and maintaining engagement through 8-12min videos. However, faceless format works perfectly - the content is about ideas, not personality. Medium personality investment: voice should be warm and thoughtful but not performative. Think podcast host, not motivational speaker"
        },
        monetizationRoadmap: {
          month1to3: "Focus on AdSense ($8-15 CPM due to educated audience). Apply for monetization at 1K subs/4K watch hours. Avoid sponsors initially",
          month4to6: "Introduce affiliate: Bible study apps (YouVersion, Logos), prayer/meditation apps (Pray.com, Hallow), philosophy books. Launch email list for deeper dives",
          month7to12: "Digital products: Study guide PDFs ($9-19), 'Bible Stories Decoded' course ($49-97), Monthly deep-dive membership ($9/mo). First sponsor outreach to faith-tech companies",
          longTerm: "Authority positioning enables $500-2000 speaking engagements, consulting for religious content creators, premium Biblical analysis community ($29/mo), book deal possibility"
        },
        launchPlan: {
          month1: {
            focus: "Proof of concept + SEO foundation",
            actions: [
              "Publish 4 videos targeting top searched stories (David, Noah, Cain, Prodigal Son)",
              "Optimize titles for '[Bible story name] explained' + '[story name] psychology'",
              "Create 10 Shorts from best moments to test virality",
              "Engage deeply in comments - build community feel",
              "Study analytics: which psychological angle gets highest retention"
            ]
          },
          month2: {
            focus: "Double down on winners + authority building",
            actions: [
              "Analyze Month 1 CTR and AVD - identify winning formula",
              "Publish 4 new videos following proven pattern",
              "Create series: 'Misunderstood Bible Verses' for binge-watching",
              "Start email list with 'Deep Dive' lead magnet",
              "Reach out to 3 similar channels for collaboration/cross-promotion",
              "Test thumbnail variations - classical art vs modern diagrams"
            ]
          },
          month3: {
            focus: "Scale and monetize",
            actions: [
              "Hit monetization if possible (4K hours, 1K subs)",
              "Launch first affiliate partnership with Bible app",
              "Create 'Biblical Wisdom' playlist for evergreen traffic",
              "Expand to Instagram Reels with top-performing content",
              "Plan first digital product (study guide) for Month 4",
              "Establish posting rhythm: Tuesday long-form, Friday Short"
            ]
          }
        },
        finalRecommendation: "This niche has exceptional potential for patient, thoughtful creators. Your competitive advantage is the psychological/philosophical lens - own that angle relentlessly. Success depends on balancing respect for source material with fresh interpretation. Don't chase trends - build a library of timeless content that compounds views over years. The audience is sophisticated and values depth over virality. Start with quick wins (well-known stories), establish credibility, then explore deeper territory. This can become a 6-figure YouTube channel within 18-24 months with consistent quality execution."
      };
    }
    
    // Default premium mock for any other niche
    return {
      executiveSummary: `Preliminary analysis indicates ${nicheIdea} presents moderate to strong opportunity depending on execution positioning. Market demonstrates active search behavior and established creator ecosystem, suggesting validated demand. Primary monetization vectors include AdSense, affiliate partnerships, and potential digital products. Competition exists but appears fragmented - opportunity for clear market leader with distinctive angle. Risk factors center on content differentiation and sustained production capability. Recommended strategy: identify underserved sub-audience within broader niche and dominate that specific segment before expanding.`,
      overallScore: 79,
      verdict: "Yellow Light",
      scores: { demand: 8, monetization: 7, competition: 6, facelessFit: 8, contentSupply: 8, differentiation: 7, safetyScore: 8 },
      positioning: `Position as the practical implementation expert in ${nicheIdea} - focus on showing real results and systems, not just theory.`,
      targetAudience: `Primary: Ages 25-40 actively engaged in ${nicheIdea} who feel existing content is either too basic or too advanced. They want actionable information with clear ROI, minimal fluff, and respect for their intelligence. Likely frustrated with generic advice and willing to invest time in substantive content.`,
      channelFormat: "Depends on content type: tutorials need screen recordings, analysis needs visualization, case studies need before/after documentation",
      contentPillars: ["Practical Implementation & How-To", "Myth-Busting & Contrarian Takes", "Real Case Studies & Results"],
      videoIdeas: {
        quickWins: [
          `The ${nicheIdea} Mistake 80% of People Make`,
          `${nicheIdea}: What Actually Works in 2026`,
          `I Tested 5 ${nicheIdea} Methods - Only 2 Worked`,
          `${nicheIdea} on $0 Budget: Complete Guide`,
          `Why Your ${nicheIdea} Results Suck (And The Fix)`
        ],
        authorityBuilders: [
          `The ${nicheIdea} Framework Nobody Teaches`,
          `I Analyzed 100 Successful ${nicheIdea} Examples - Here's The Pattern`,
          `${nicheIdea}: Beginner vs Intermediate vs Advanced Strategies`,
          `The Psychology Behind ${nicheIdea} That Actually Works`,
          `${nicheIdea} Myths Debunked By Data`,
          `Complete ${nicheIdea} System I Use Daily`,
          `How Top ${nicheIdea} Experts Actually Do It`,
          `${nicheIdea} Tools Comparison: I Tested Everything`,
          `The Scientific Approach to ${nicheIdea}`,
          `Common ${nicheIdea} Advice That's Completely Wrong`
        ],
        viralPotential: [
          `I Spent 100 Hours Mastering ${nicheIdea} - Here's The Shortcut`,
          `${nicheIdea} Changed My Life - 6 Month Transformation`,
          `The ${nicheIdea} Secret Successful People Won't Tell You`,
          `I Did ${nicheIdea} Wrong For Years - Don't Make My Mistakes`,
          `${nicheIdea}: The Uncomfortable Truth Nobody Talks About`,
          `Why ${nicheIdea} Doesn't Work (Unless You Do This)`,
          `I Challenged A ${nicheIdea} Expert - Results Shocked Us`,
          `${nicheIdea} Reality Check: Expectations vs Reality`,
          `The ${nicheIdea} Trend That's Actually Dangerous`,
          `${nicheIdea} Explained Using [Unexpected Analogy]`
        ],
        evergreen: [
          `Complete Beginner's Guide to ${nicheIdea}`,
          `${nicheIdea} Frequently Asked Questions Answered`,
          `Best ${nicheIdea} Resources and Tools`,
          `${nicheIdea} Glossary: Every Term Explained`,
          `Getting Started With ${nicheIdea}: Step-by-Step`
        ]
      },
      competitorAnalysis: [
        { channel: "[Top Channel in Niche]", subs: "500K-2M", strength: "Established authority and consistent quality", gap: "Content often too broad - opportunity for niche-specific depth" },
        { channel: "[Mid-tier Channel]", subs: "100K-300K", strength: "Good production quality", gap: "Lacks personality - opportunity for more relatable approach" },
        { channel: "[Emerging Channel]", subs: "50K-100K", strength: "Fresh perspective and authenticity", gap: "Inconsistent upload schedule - opportunity through consistency" }
      ],
      stealThisAngle: {
        thumbnailStyle: "Bold text overlay on relevant imagery - clear value proposition visible at small size. Example: 'I Tested 10 Methods' + split-screen before/after",
        titleFormula: "[Specific Result/Timeframe] + [Surprising Element]: [Clear Benefit] - Example: 'I Spent $500 Testing [Topic] - Only 2 Things Worked'",
        contentStructure: "Hook with result/claim (30sec) → Setup/Context (1min) → Method/Process (4-6min) → Results/Proof (2min) → Key Takeaways (1min)"
      },
      redFlags: [
        { severity: "medium", issue: "Market saturation in broad approaches", mitigation: "Find specific sub-niche or unique angle. Don't try to compete on established topics - find gaps" },
        { severity: "low", issue: "Generic stock footage overuse", mitigation: "Show real examples, personal footage, or original graphics. Authenticity beats polish" },
        { severity: "medium", issue: "Consistency challenges", mitigation: "Batch record content. Build 4-week buffer before launch. Have backup simple video formats for busy weeks" }
      ],
      contentCalendar: {
        month1: [
          "Week 1: Quick Win video targeting high-search keyword",
          "Week 2: Case study or personal result story",
          "Week 3: Myth-busting or contrarian take",
          "Week 4: Practical tutorial or step-by-step guide"
        ],
        month2: [
          "Week 1: Build on Month 1's top performer",
          "Week 2: Authority builder (framework or system)",
          "Week 3: Viral attempt (controversial or surprising)",
          "Week 4: Evergreen content for long-term SEO"
        ],
        month3: [
          "Week 1: Series start (part 1 of 3-4)",
          "Week 2: Series continuation",
          "Week 3: Series conclusion",
          "Week 4: Standalone authority piece"
        ]
      },
      thumbnailStrategy: {
        style: "Clean and direct - bold text, relevant imagery, clear value proposition. Avoid clutter",
        colorPalette: "High contrast - typically dark background with bright accent color for text. Test yellow, orange, or cyan against navy/black",
        faceRecommendation: "Test both - some niches benefit from personal connection (face), others from authoritative anonymity (no face). Run A/B test first 10 videos"
      },
      voiceFaceCalculator: {
        voiceNecessity: 70,
        faceNecessity: 40,
        personalityInvestment: "medium",
        reasoning: "Voice adds significant engagement for narrative flow and maintaining interest. Face is optional but can build trust faster in advice/tutorial content. Medium personality: be authentic and conversational, but content should be the star, not you"
      },
      monetizationRoadmap: {
        month1to3: "AdSense only - focus on views and watch time. Research affiliate programs in niche. Build email list with simple lead magnet",
        month4to6: "Introduce 2-3 affiliate products you actually use and recommend. Launch basic digital product ($9-29) - template, guide, or toolkit",
        month7to12: "Scale affiliate revenue, launch course ($97-297), explore sponsorships, create membership tier ($9-19/mo) for exclusive content",
        longTerm: "Diversified income: AdSense (20%), Affiliates (30%), Digital Products (30%), Sponsorships (15%), Memberships (5%). Potential consulting/speaking"
      },
      launchPlan: {
        month1: {
          focus: "Validate concept and build SEO foundation",
          actions: [
            "Publish 4-6 videos targeting different keywords and styles",
            "Optimize for search: [topic] + 'explained/tutorial/guide/review'",
            "Create 5-10 Shorts from best moments for discovery",
            "Analyze which video style gets best retention",
            "Engage in comments and competitor's channels to build presence"
          ]
        },
        month2: {
          focus: "Double down on what works",
          actions: [
            "Analyze CTR, AVD, and traffic sources from Month 1",
            "Create more videos in winning format/topic",
            "Test different thumbnail styles - track performance",
            "Start building email list with content upgrade",
            "Plan first collaboration with similar-sized channel"
          ]
        },
        month3: {
          focus: "Scale and prepare monetization",
          actions: [
            "Publish consistently - establish reliable schedule",
            "Create playlist strategy for binge-watching",
            "Expand to one additional platform (Instagram/TikTok) with repurposed content",
            "Research affiliate programs for Month 4 launch",
            "Hit monetization requirements if possible (1K subs, 4K hours)"
          ]
        }
      },
      finalRecommendation: `${nicheIdea} has potential but requires strong differentiation to succeed. Your success depends on finding a specific angle you can own - don't try to be everything to everyone. Study the top 20 channels in this space and identify what's missing. That gap is your opportunity. Focus on building a small, engaged audience rather than chasing viral hits. Consistency and quality compound over time. If you can commit to 50-100 videos with continuous improvement, this can become a sustainable income source. Start narrow, prove value, then expand.`
    };
  };

  const getVerdictColor = (v) => ({ 'Green Light': '#10b981', 'Yellow Light': '#f59e0b', 'Red Light': '#ef4444', 'Hidden Gem': '#8b5cf6', 'Crowded But Profitable': '#3b82f6' }[v] || '#6b7280');
  const getScoreColor = (s) => s >= 8 ? '#10b981' : s >= 6 ? '#f59e0b' : '#ef4444';
  const getRiskColor = (s) => ({ high: '#ef4444', medium: '#f59e0b', low: '#10b981' }[s] || '#6b7280');

  const btnStyle = { background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', color: '#fff', border: 'none', padding: '18px 40px', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s', boxShadow: '0 10px 30px rgba(6,182,212,0.3)' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', fontFamily: '"DM Sans", -apple-system, sans-serif', color: '#f1f5f9', overflow: 'auto' }}>
      
      {/* LANDING - keeping original */}
      {view === 'landing' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Target size={28} color="#fff" /></div>
              <h1 style={{ fontSize: '42px', fontWeight: '800', margin: 0, background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Niche Compass AI</h1>
            </div>
            <p style={{ fontSize: '24px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Professional YouTube Strategy Analysis</p>
            <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Get a $100+ professional analysis: 30 video ideas, competitor intel, monetization roadmap, and 90-day launch plan.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {[
              { icon: Award, title: 'Executive Analysis', desc: 'Professional-grade strategic overview' },
              { icon: Lightbulb, title: '30 Video Ideas', desc: 'Quick wins, authority builders, viral potential' },
              { icon: Users2, title: 'Competitor Intel', desc: 'Channels to study and gaps to exploit' },
              { icon: Flame, title: 'Steal This Angle', desc: 'Proven formulas from successful channels' },
              { icon: Shield, title: 'Red Flag Detector', desc: 'Demonetization risks with mitigation' },
              { icon: Calendar, title: '90-Day Launch Plan', desc: 'Month-by-month execution roadmap' }
            ].map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '28px', backdropFilter: 'blur(10px)', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <f.icon size={32} style={{ color: '#06b6d4', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.5', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => { setView('questionnaire'); setCurrentStep(0); setResponses({}); setAnalysis(null); }} style={btnStyle}><Zap size={20} />Get Premium Analysis<ChevronRight size={20} /></button>
            {savedEvaluations.length > 0 && <button onClick={() => setView('history')} style={{ ...btnStyle, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}><Save size={20} />View Saved ({savedEvaluations.length})</button>}
          </div>
        </div>
      )}

      {/* QUESTIONNAIRE - keeping original */}
      {view === 'questionnaire' && (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <button onClick={() => setView('landing')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', gap: '8px', padding: '8px' }}><ArrowLeft size={16} />Back</button>
              <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>Question {currentStep + 1} of {questions.length}</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}><div style={{ height: '100%', background: 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)', width: `${((currentStep + 1) / questions.length) * 100}%`, transition: 'width 0.4s', borderRadius: '8px' }} /></div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '48px', backdropFilter: 'blur(10px)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.3' }}>{questions[currentStep].question}</h2>
              {questions[currentStep].subtitle && <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '32px' }}>{questions[currentStep].subtitle}</p>}

              {questions[currentStep].type === 'textarea' && <textarea value={responses[questions[currentStep].id] || ''} onChange={(e) => setResponses({ ...responses, [questions[currentStep].id]: e.target.value })} placeholder={questions[currentStep].placeholder} style={{ width: '100%', minHeight: '150px', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', fontSize: '16px', color: '#f1f5f9', resize: 'vertical', fontFamily: 'inherit' }} onFocus={e => e.currentTarget.style.borderColor = '#06b6d4'} onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />}

              {questions[currentStep].type === 'radio' && <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>{questions[currentStep].options.map((opt, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: responses[questions[currentStep].id] === opt ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.03)', border: `2px solid ${responses[questions[currentStep].id] === opt ? '#06b6d4' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'all 0.3s', fontSize: '16px' }}>
                  <input type="radio" value={opt} checked={responses[questions[currentStep].id] === opt} onChange={(e) => setResponses({ ...responses, [questions[currentStep].id]: e.target.value })} style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#06b6d4' }} />{opt}
                </label>
              ))}</div>}
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              {currentStep > 0 && <button onClick={() => setCurrentStep(currentStep - 1)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#f1f5f9', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Previous</button>}
              <button onClick={() => currentStep < questions.length - 1 ? setCurrentStep(currentStep + 1) : analyzeNiche()} disabled={!responses[questions[currentStep].id]} style={{ flex: 2, background: responses[questions[currentStep].id] ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' : 'rgba(255,255,255,0.05)', border: 'none', color: responses[questions[currentStep].id] ? '#fff' : '#64748b', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: responses[questions[currentStep].id] ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>{currentStep === questions.length - 1 ? 'Get Premium Analysis' : 'Next'}<ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      )}

      {/* ANALYZING */}
      {view === 'analyzing' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', margin: '0 auto 32px', background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 2s infinite' }}><Sparkles size={40} color="#fff" /></div>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>Generating Premium Analysis...</h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '48px', lineHeight: '1.6' }}>Creating your professional strategy report with competitor analysis, video ideas, and monetization roadmap.</p>
          <style>{`@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }`}</style>
        </div>
      )}

      {/* PREMIUM RESULTS - This is where the magic happens */}
      {view === 'results' && analysis && (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <button onClick={() => setView('landing')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', gap: '8px', padding: '8px', marginBottom: '12px' }}><ArrowLeft size={16} />Back</button>
              <h1 style={{ fontSize: '36px', fontWeight: '800', margin: 0 }}>Premium Strategy Report</h1>
              <p style={{ fontSize: '18px', color: '#94a3b8', margin: '8px 0 0' }}>{responses.nicheIdea}</p>
            </div>
            <button onClick={() => { setView('questionnaire'); setCurrentStep(0); setResponses({}); setAnalysis(null); }} style={{ ...btnStyle, padding: '14px 28px', fontSize: '16px' }}><Zap size={18} />Analyze Another</button>
          </div>

          {/* Executive Summary */}
          <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.1) 100%)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '20px', padding: '40px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Award size={28} color="#06b6d4" />
              <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>Executive Summary</h2>
            </div>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line' }}>{analysis.executiveSummary}</p>
          </div>

          {/* Overall Score Card */}
          <div style={{ background: `linear-gradient(135deg, ${getVerdictColor(analysis.verdict)}15 0%, ${getVerdictColor(analysis.verdict)}05 100%)`, border: `2px solid ${getVerdictColor(analysis.verdict)}`, borderRadius: '24px', padding: '48px', marginBottom: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '72px', fontWeight: '900', color: getVerdictColor(analysis.verdict), marginBottom: '16px' }}>{analysis.overallScore}<span style={{ fontSize: '48px', opacity: 0.5 }}>/100</span></div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 28px', background: getVerdictColor(analysis.verdict), borderRadius: '12px', fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '24px' }}>
              {analysis.verdict === 'Green Light' ? <CheckCircle size={28} /> : analysis.verdict === 'Hidden Gem' ? <Star size={28} /> : <AlertTriangle size={28} />}{analysis.verdict}
            </div>
            <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '900px', margin: '0 auto', lineHeight: '1.6' }}>{analysis.positioning}</p>
          </div>

          {/* Score Dashboard - Keeping same */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {Object.entries(analysis.scores).map(([key, value]) => {
              const labels = { demand: 'Market Demand', monetization: 'Monetization', competition: 'Competition', facelessFit: 'Faceless Fit', contentSupply: 'Content Supply', differentiation: 'Differentiation', safetyScore: 'Safety Score' };
              const icons = { demand: TrendingUp, monetization: DollarSign, competition: Users, facelessFit: Video, contentSupply: BarChart3, differentiation: Star, safetyScore: Shield };
              const Icon = icons[key];
              return (
                <div key={key} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><Icon size={24} color={getScoreColor(value)} /><span style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1' }}>{labels[key]}</span></div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: getScoreColor(value), marginBottom: '12px' }}>{value}<span style={{ fontSize: '20px', opacity: 0.5 }}>/10</span></div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}><div style={{ height: '100%', width: `${value * 10}%`, background: getScoreColor(value), borderRadius: '8px', transition: 'width 1s' }} /></div>
                </div>
              );
            })}
          </div>

          {/* Target Audience */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Users size={24} color="#06b6d4" />
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Target Audience Profile</h3>
            </div>
            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.7', margin: 0 }}>{analysis.targetAudience}</p>
          </div>

          {/* 30 VIDEO IDEAS - PREMIUM FEATURE */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Lightbulb size={24} color="#06b6d4" />
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>30 Strategic Video Ideas</h3>
            </div>
            
            {/* Quick Wins */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Zap size={20} color="#10b981" />
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#10b981', margin: 0 }}>Quick Wins (First 5 Videos)</h4>
              </div>
              <div style={{ display: 'grid', gap: '10px' }}>
                {analysis.videoIdeas.quickWins.map((idea, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px' }}>
                    <div style={{ minWidth: '28px', height: '28px', background: '#10b981', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#000' }}>{i+1}</div>
                    <span style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.5' }}>{idea}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Authority Builders */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Shield size={20} color="#3b82f6" />
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#3b82f6', margin: 0 }}>Authority Builders (Establish Credibility)</h4>
              </div>
              <div style={{ display: 'grid', gap: '10px' }}>
                {analysis.videoIdeas.authorityBuilders.map((idea, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px' }}>
                    <div style={{ minWidth: '28px', height: '28px', background: '#3b82f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>{i+1}</div>
                    <span style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.5' }}>{idea}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Viral Potential */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Flame size={20} color="#f59e0b" />
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#f59e0b', margin: 0 }}>Viral Potential (High Growth)</h4>
              </div>
              <div style={{ display: 'grid', gap: '10px' }}>
                {analysis.videoIdeas.viralPotential.map((idea, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px' }}>
                    <div style={{ minWidth: '28px', height: '28px', background: '#f59e0b', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>{i+1}</div>
                    <span style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.5' }}>{idea}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evergreen */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <TrendingUp size={20} color="#8b5cf6" />
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#8b5cf6', margin: 0 }}>Evergreen Content (Long-term Traffic)</h4>
              </div>
              <div style={{ display: 'grid', gap: '10px' }}>
                {analysis.videoIdeas.evergreen.map((idea, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px' }}>
                    <div style={{ minWidth: '28px', height: '28px', background: '#8b5cf6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>{i+1}</div>
                    <span style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.5' }}>{idea}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COMPETITOR ANALYSIS - PREMIUM FEATURE */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Users2 size={24} color="#06b6d4" />
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Competitor Intelligence</h3>
            </div>
            <div style={{ display: 'grid', gap: '16px' }}>
              {analysis.competitorAnalysis.map((comp, i) => (
                <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#f1f5f9' }}>{comp.channel}</h4>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#06b6d4', padding: '4px 12px', background: 'rgba(6,182,212,0.2)', borderRadius: '6px' }}>{comp.subs}</span>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>✓ Strength: </span>
                    <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{comp.strength}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#f59e0b' }}>→ Your Opportunity: </span>
                    <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{comp.gap}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEAL THIS ANGLE - PREMIUM FEATURE */}
          <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <ThumbsUp size={24} color="#8b5cf6" />
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Steal This Angle</h3>
              <span style={{ fontSize: '12px', color: '#8b5cf6', padding: '4px 8px', background: 'rgba(139,92,246,0.2)', borderRadius: '6px', fontWeight: '600' }}>PROVEN FORMULAS</span>
            </div>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#8b5cf6', marginBottom: '8px' }}>📸 Thumbnail Style</h4>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>{analysis.stealThisAngle.thumbnailStyle}</p>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#8b5cf6', marginBottom: '8px' }}>✍️ Title Formula</h4>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>{analysis.stealThisAngle.titleFormula}</p>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#8b5cf6', marginBottom: '8px' }}>🎬 Content Structure</h4>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>{analysis.stealThisAngle.contentStructure}</p>
              </div>
            </div>
          </div>

          {/* RED FLAG DETECTOR - PREMIUM FEATURE */}
          <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <AlertTriangle size={24} color="#ef4444" />
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Red Flag Detector</h3>
            </div>
            <div style={{ display: 'grid', gap: '16px' }}>
              {analysis.redFlags.map((flag, i) => (
                <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderLeft: `4px solid ${getRiskColor(flag.severity)}`, borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: getRiskColor(flag.severity), padding: '4px 8px', background: `${getRiskColor(flag.severity)}20`, borderRadius: '6px', textTransform: 'uppercase' }}>{flag.severity} RISK</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#f1f5f9' }}>{flag.issue}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, paddingLeft: '12px' }}>→ {flag.mitigation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* VOICE/FACE CALCULATOR - PREMIUM FEATURE */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Eye size={24} color="#06b6d4" />
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Voice & Face Requirements</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Mic size={18} color="#06b6d4" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1' }}>Voice Necessity</span>
                </div>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#06b6d4', marginBottom: '8px' }}>{analysis.voiceFaceCalculator.voiceNecessity}%</div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${analysis.voiceFaceCalculator.voiceNecessity}%`, background: '#06b6d4', borderRadius: '6px' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Eye size={18} color="#3b82f6" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1' }}>Face Necessity</span>
                </div>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#3b82f6', marginBottom: '8px' }}>{analysis.voiceFaceCalculator.faceNecessity}%</div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${analysis.voiceFaceCalculator.faceNecessity}%`, background: '#3b82f6', borderRadius: '6px' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Users size={18} color="#10b981" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1' }}>Personality Investment</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', textTransform: 'uppercase', marginTop: '16px' }}>{analysis.voiceFaceCalculator.personalityInvestment}</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', margin: 0, padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>{analysis.voiceFaceCalculator.reasoning}</p>
          </div>

          {/* THUMBNAIL STRATEGY - PREMIUM FEATURE */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Image size={24} color="#06b6d4" />
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Thumbnail Strategy</h3>
            </div>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#06b6d4', marginBottom: '8px' }}>Recommended Style</h4>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>{analysis.thumbnailStrategy.style}</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#06b6d4', marginBottom: '8px' }}>Color Palette</h4>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>{analysis.thumbnailStrategy.colorPalette}</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#06b6d4', marginBottom: '8px' }}>Face Recommendation</h4>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>{analysis.thumbnailStrategy.faceRecommendation}</p>
              </div>
            </div>
          </div>

          {/* 90-DAY LAUNCH PLAN - PREMIUM FEATURE */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Calendar size={24} color="#06b6d4" />
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>90-Day Launch Plan</h3>
            </div>
            <div style={{ display: 'grid', gap: '20px' }}>
              {Object.entries(analysis.launchPlan).map(([month, plan]) => (
                <div key={month} style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '4px solid #06b6d4' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#06b6d4', textTransform: 'uppercase', marginBottom: '12px' }}>{month}</h4>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#f59e0b', marginBottom: '12px' }}>Focus: {plan.focus}</div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {plan.actions.map((action, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                        <div style={{ minWidth: '20px', height: '20px', background: '#06b6d4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', marginTop: '2px' }}>{i+1}</div>
                        <span style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.5' }}>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTENT CALENDAR - PREMIUM FEATURE */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Calendar size={24} color="#06b6d4" />
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>12-Week Content Calendar</h3>
            </div>
            <div style={{ display: 'grid', gap: '16px' }}>
              {Object.entries(analysis.contentCalendar).map(([month, weeks]) => (
                <div key={month} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#06b6d4', marginBottom: '12px', textTransform: 'uppercase' }}>{month}</h4>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {weeks.map((week, i) => (
                      <div key={i} style={{ fontSize: '14px', color: '#cbd5e1', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>{week}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MONETIZATION ROADMAP - PREMIUM FEATURE */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <DollarSign size={24} color="#10b981" />
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Monetization Roadmap</h3>
            </div>
            <div style={{ display: 'grid', gap: '16px' }}>
              {Object.entries(analysis.monetizationRoadmap).map(([phase, strategy]) => (
                <div key={phase} style={{ padding: '20px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#10b981', marginBottom: '10px', textTransform: 'uppercase' }}>{phase.replace('month', 'Month ').replace('to', '-').replace('longTerm', 'Long Term')}</h4>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>{strategy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Recommendation */}
          <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.1) 100%)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <CheckCircle size={40} color="#06b6d4" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#f1f5f9' }}>Strategic Recommendation</h3>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto' }}>{analysis.finalRecommendation}</p>
          </div>
        </div>
      )}

      {/* HISTORY - Keeping same */}
      {view === 'history' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ marginBottom: '40px' }}>
            <button onClick={() => setView('landing')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', gap: '8px', padding: '8px', marginBottom: '16px' }}><ArrowLeft size={16} />Back</button>
            <h1 style={{ fontSize: '36px', fontWeight: '800', margin: 0 }}>Saved Evaluations</h1>
            <p style={{ fontSize: '16px', color: '#94a3b8', margin: '8px 0 0' }}>{savedEvaluations.length} niche{savedEvaluations.length !== 1 ? 's' : ''} analyzed</p>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {savedEvaluations.map(evaluation => (
              <div key={evaluation.id} onClick={() => { setAnalysis(evaluation.analysis); setResponses(evaluation.responses); setView('results'); }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '28px', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{evaluation.nicheIdea}</h3>
                    <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>{new Date(evaluation.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: `${getVerdictColor(evaluation.analysis.verdict)}20`, border: `1px solid ${getVerdictColor(evaluation.analysis.verdict)}`, borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: getVerdictColor(evaluation.analysis.verdict) }}>{evaluation.analysis.verdict}</div>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: getVerdictColor(evaluation.analysis.verdict) }}>{evaluation.analysis.overallScore}/100</div>
                    </div>
                  </div>
                  <ChevronRight size={24} color="#94a3b8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
