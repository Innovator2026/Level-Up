import { useState, useEffect } from "react";

// ── Two colours only. Rich green + black on white. ────────
const G  = "#2E7D32";   // deep apple green
const GD = "#1B5E20";   // darker deep green
const GL = "#E8F5E9";   // light green tint
const BK = "#111111";   // near black — all text
const GR = "#888888";   // grey — secondary text only
const BD = "#ebebeb";   // border
const WH = "#ffffff";   // pure white
const BG = "#f7f7f7";   // light grey
const ER = "#c0392b";   // error only
const F  = "'DM Sans', 'Nunito', sans-serif";
const FS = "'Playfair Display', 'Georgia', serif";

function useFont() {
  useEffect(() => {
    if (!document.getElementById("lu-font")) {
      const l = document.createElement("link");
      l.id = "lu-font"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap";
      document.head.appendChild(l);
    }
  }, []);
}

// ── Cup SVG — pixel-matched to logo ──────────────────────
function Cup({ size = 64 }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 100 90" fill="none">
      {/* Steam dots — staggered diagonal: small low-left, medium mid, large high-right */}
      <circle cx="38" cy="22" r="3.5" fill={G} opacity=".6"/>
      <circle cx="50" cy="16" r="5"   fill={G} opacity=".85"/>
      <circle cx="63" cy="10" r="6.5" fill={G}/>
      {/* Bowl — flat top edge, deep curved bottom (semicircle) */}
      <path d="M18 38 L82 38 Q82 74 50 74 Q18 74 18 38 Z"
        fill="none" stroke={G} strokeWidth="5" strokeLinejoin="round"/>
      {/* Handle — small tight C curve on right */}
      <path d="M82 44 Q94 44 94 54 Q94 64 82 64"
        fill="none" stroke={G} strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );
}

function Logo({ large }) {
  if (large) return null; // splash renders cup + text separately
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <Cup size={28}/>
      <span style={{ fontSize:19, fontWeight:700, color:G, fontFamily:"'Nunito', sans-serif", letterSpacing:"-.5px" }}>
        Level Up
      </span>
    </div>
  );
}

function Field({ label, type="text", value, onChange, placeholder, autoFocus }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom:16 }}>
      {label && <div style={{ fontSize:12, color:GR, fontWeight:700, marginBottom:6, fontFamily:F }}>{label}</div>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} autoFocus={autoFocus}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width:"100%", padding:"14px 16px", backgroundColor:WH, border:`2px solid ${focused ? G : BD}`, borderRadius:12, color:BK, fontSize:15, outline:"none", fontFamily:F, boxSizing:"border-box", fontWeight:600, transition:"border-color .15s" }}/>
    </div>
  );
}

function PillBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ padding:"10px 18px", borderRadius:24, border:`2px solid ${active ? G : BD}`, backgroundColor: active ? G : WH, color: active ? WH : BK, fontSize:14, fontWeight: active ? 800 : 600, cursor:"pointer", fontFamily:F, transition:"all .15s", marginBottom:4 }}>
      {label}
    </button>
  );
}

function PrimaryBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width:"100%", padding:"16px", backgroundColor: disabled ? BD : G, border:"none", borderRadius:14, color: disabled ? GR : WH, fontSize:16, fontWeight:900, cursor: disabled ? "not-allowed" : "pointer", fontFamily:F, transition:"all .15s" }}>
      {children}
    </button>
  );
}

function ProgressDots({ step, total }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", gap:6 }}>
      {Array.from({ length:total }).map((_,i) => (
        <div key={i} style={{ width: i===step ? 22 : 7, height:7, borderRadius:4, backgroundColor: i===step ? G : BD, transition:"all .3s" }}/>
      ))}
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────
const CITIES    = ["Toronto","Vancouver","Calgary","Montréal","Ottawa","Edmonton","Winnipeg","Halifax","Other"];
const COUNTRIES = ["India","Philippines","China","Nigeria","Syria","Ghana","Pakistan","Brazil","Ukraine","Colombia","Korea","Mexico","Ethiopia","Other"];
const YEARS     = Array.from({ length:12 }, (_,i) => String(new Date().getFullYear()-i));
const LANGUAGES = ["English","French","Tagalog","Mandarin","Hindi","Arabic","Spanish","Punjabi","Korean","Portuguese","Ukrainian","Urdu"];
const AREAS     = ["Resume & Job Search","Interview Prep","Credential Recognition","Canadian Workplace","Networking","LinkedIn","Salary Negotiation","Career Pivot"];
const EXP       = ["1–2 years","3–5 years","6–10 years","11–15 years","16–20 years","20+ years"];
const INDUSTRIES= ["Technology","Finance","Healthcare","Engineering","Education","Law","Marketing","Accounting","Government","Consulting","Trades","Other"];

// ── SPLASH ───────────────────────────────────────────────
function Splash({ onRole }) {
  useFont();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("mentee");
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ minHeight:"100vh", fontFamily:F, display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto", position:"relative", overflow:"hidden", backgroundColor:WH }}>

      {/* Top nav */}
      <div style={{ padding:"22px 28px 0", display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", zIndex:10 }}>
        <button onClick={() => onRole("signin")} style={{ background:"none", border:`1.5px solid ${BD}`, borderRadius:22, cursor:"pointer", padding:"8px 20px", color:BK, fontSize:13, fontWeight:600, fontFamily:F, letterSpacing:".02em" }}>
          Sign in
        </button>
        <button onClick={() => setMenuOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px", display:"flex", flexDirection:"column", gap:5 }}>
          <div style={{ width:22, height:1.5, backgroundColor:BK, borderRadius:2 }}/>
          <div style={{ width:22, height:1.5, backgroundColor:BK, borderRadius:2 }}/>
          <div style={{ width:16, height:1.5, backgroundColor:BK, borderRadius:2 }}/>
        </button>
      </div>

      {/* Menu overlay */}
      {menuOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:300 }}>
          <div style={{ position:"absolute", inset:0, backgroundColor:"rgba(0,0,0,.35)" }} onClick={() => setMenuOpen(false)}/>
          <div style={{ position:"absolute", top:0, right:0, width:270, height:"100%", backgroundColor:WH, boxShadow:"-4px 0 24px rgba(0,0,0,.1)", display:"flex", flexDirection:"column" }}>
            <div style={{ padding:"24px 28px 18px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${BD}` }}>
              <Logo/>
              <button onClick={() => setMenuOpen(false)} style={{ background:"none", border:"none", fontSize:22, color:GR, cursor:"pointer", lineHeight:1, fontWeight:300 }}>×</button>
            </div>
            <div style={{ flex:1 }}>
              {[
                { label:"Sign In",        action: () => { setMenuOpen(false); onRole("signin"); } },
                { label:"Create Account", action: () => { setMenuOpen(false); onRole("mentee"); } },
                { label:"About",          action: () => setMenuOpen(false) },
                { label:"How it works",   action: () => setMenuOpen(false) },
                { label:"Safety",         action: () => setMenuOpen(false) },
                { label:"Support",        action: () => setMenuOpen(false) },
              ].map(item => (
                <button key={item.label} onClick={item.action} style={{ display:"block", width:"100%", textAlign:"left", padding:"17px 28px", background:"none", border:"none", borderBottom:`1px solid ${BD}`, fontSize:14, fontWeight:500, color:BK, cursor:"pointer", fontFamily:F, letterSpacing:".01em" }}>
                  {item.label}
                </button>
              ))}
            </div>
            <div style={{ padding:"24px 28px", borderTop:`1px solid ${BD}` }}>
              <PrimaryBtn onClick={() => { setMenuOpen(false); onRole("mentee"); }}>Get Started</PrimaryBtn>
            </div>
          </div>
        </div>
      )}

      {/* Centre content */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"20px 40px 0", position:"relative", zIndex:10 }}>

        {/* Cup — rich green, animated steam */}
        <div style={{ marginBottom:20 }}>
          <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
            {[
              { cx:38, cy:58, r:3.5, phase:0   },
              { cx:50, cy:52, r:5,   phase:0.7 },
              { cx:63, cy:46, r:6.5, phase:1.4 },
            ].map((dot, i) => {
              const t = ((tick * 0.018) + dot.phase) % 2;
              const rise = t * 22;
              const opacity = t < 1 ? t * 0.9 : (2 - t) * 0.9;
              const scale = 0.5 + t * 0.6;
              return <circle key={i} cx={dot.cx} cy={dot.cy - rise} r={dot.r * scale} fill={G} opacity={opacity}/>;
            })}
            <path d="M14 66 L86 66 Q86 94 50 94 Q14 94 14 66 Z" fill="none" stroke={G} strokeWidth="5" strokeLinejoin="round"/>
            <path d="M86 72 Q98 72 98 80 Q98 88 86 88" fill="none" stroke={G} strokeWidth="5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Wordmark — rich green, serif, confident */}
        <div style={{ fontSize:64, fontWeight:700, color:G, fontFamily:FS, letterSpacing:"-2px", lineHeight:1, marginBottom:6 }}>
          Level Up
        </div>

        {/* Simple tagline — black, airy */}
        <div style={{ fontSize:11, color:GR, letterSpacing:".25em", textTransform:"uppercase", fontWeight:500, marginBottom:24 }}>
          Mentorship · Newcomers · Canada
        </div>

        {/* Blurb — warm, human, hopeful */}
        <div style={{ fontSize:18, color:BK, lineHeight:1.75, maxWidth:300, fontWeight:400, fontFamily:F }}>
          The guidance you need, from people who've been exactly where you are.
        </div>
      </div>

      {/* Bottom CTAs */}
      <div style={{ padding:"36px 28px 52px", position:"relative", zIndex:10 }}>

        {/* Role toggle */}
        <div style={{ display:"flex", backgroundColor:BG, borderRadius:12, padding:4, marginBottom:14, border:`1px solid ${BD}` }}>
          {["mentee","mentor"].map(r => (
            <button key={r} onClick={() => setSelectedRole(r)}
              style={{ flex:1, padding:"14px 8px", borderRadius:10, border:"none",
                backgroundColor: selectedRole===r ? G : "transparent",
                color: selectedRole===r ? WH : GR,
                fontSize:14, fontWeight:selectedRole===r?600:500,
                cursor:"pointer", fontFamily:F, transition:"all .2s" }}>
              {r === "mentee" ? "Mentee" : "Mentor"}
            </button>
          ))}
        </div>

        {/* Context line */}
        <div style={{ textAlign:"center", fontSize:14, color:GR, marginBottom:20, fontWeight:400, minHeight:22, fontStyle:"italic" }}>
          {selectedRole === "mentee" && "Find your guide in Canada"}
          {selectedRole === "mentor" && "Share your experience. Change a life."}
        </div>

        {/* Main CTA — rich green */}
        <button onClick={() => onRole(selectedRole)} style={{ width:"100%", padding:"19px", backgroundColor:G, border:"none", borderRadius:14, fontSize:16, fontWeight:600, color:WH, cursor:"pointer", fontFamily:F, marginBottom:12, letterSpacing:".03em", boxShadow:`0 6px 24px ${G}44` }}>
          {selectedRole === "mentee" ? "Join as a Mentee" : "Join as a Mentor"}
        </button>

        {/* Tutorial */}
        <button onClick={() => onRole("tutorial")} style={{ width:"100%", padding:"17px", backgroundColor:WH, border:`1.5px solid ${BD}`, borderRadius:14, fontSize:14, fontWeight:500, color:BK, cursor:"pointer", fontFamily:F, marginBottom:24 }}>
          See how it works first
        </button>

        <div style={{ textAlign:"center", fontSize:11, color:GR, opacity:.5, letterSpacing:".04em" }}>
          PIPEDA compliant · Your data stays in Canada
        </div>
      </div>
    </div>
  );
}// ── SIGN IN ──────────────────────────────────────────────
function SignIn({ onBack, onSuccess }) {
  useFont();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!email.includes("@")) { setErr("Please enter a valid email."); return; }
    if (pw.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setErr(""); setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess({ email, firstName:email.split("@")[0], lastName:"", role:"mentee", blurb:"", city:"", profession:"", languages:[], linkedinUrl:"", onBreak:false }); }, 700);
  };

  return (
    <div style={{ minHeight:"100vh", backgroundColor:WH, fontFamily:F, display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto" }}>
      <div style={{ padding:"20px 24px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:GR, fontSize:22, cursor:"pointer", padding:0, lineHeight:1 }}>←</button>
        <Logo/>
        <div style={{ width:40 }}/>
      </div>
      <div style={{ flex:1, padding:"48px 28px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <div style={{ fontSize:28, fontWeight:900, color:BK, marginBottom:4 }}>Welcome back</div>
        <div style={{ fontSize:14, color:GR, marginBottom:32, fontWeight:500 }}>Sign in to continue</div>
        <Field label="Email" type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} placeholder="you@email.com" autoFocus/>
        <Field label="Password" type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr("");}} placeholder="••••••••"/>
        <div style={{ textAlign:"right", marginTop:-8, marginBottom:24 }}>
          <button style={{ background:"none", border:"none", color:GR, fontSize:12, cursor:"pointer", fontFamily:F, fontWeight:600 }}>Forgot password?</button>
        </div>
        {err && <div style={{ fontSize:13, color:ER, marginBottom:16, padding:"12px 14px", backgroundColor:"#fef2f2", borderRadius:10, border:"1px solid #fecaca" }}>{err}</div>}
        <PrimaryBtn onClick={submit}>{loading ? "Signing in…" : "Sign In"}</PrimaryBtn>
        <div style={{ textAlign:"center", marginTop:20 }}>
          <span style={{ fontSize:13, color:GR }}>Don't have an account? </span>
          <button onClick={onBack} style={{ background:"none", border:"none", color:G, fontSize:13, cursor:"pointer", fontFamily:F, fontWeight:800, textDecoration:"underline", textUnderlineOffset:3, padding:0 }}>Create one</button>
        </div>
      </div>
    </div>
  );
}

// ── SIGN UP ──────────────────────────────────────────────
function SignUp({ role, onBack, onComplete }) {
  useFont();
  const isMentor = role === "mentor" || role === "both";
  const isBoth   = role === "both";
  const [step, setStep] = useState(0);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    firstName:"", lastName:"", email:"", password:"",
    city:"", country:"", arrivalYear:"", profession:"",
    company:"", yearsExp:"", industry:"", industries:[],
    education:"", menteeGoals:[],
    languages:[], blurb:"", personalStory:"", funFact:"",
    mentorAreas:[], linkedinUrl:"", resumeUploaded:false,
  });
  const set = (k,v) => { setForm(f=>({...f,[k]:v})); setErr(""); };
  const tog = (k,v) => set(k, form[k].includes(v) ? form[k].filter(x=>x!==v) : [...form[k],v]);

  // Steps per role
  const menteeSteps = ["account","city","profession","education","m_experience","m_industry","languages","goals","blurb","arrived","linkedin"];
  const mentorSteps = ["account","city","profession","company","experience","industry","languages","areas","blurb","story","linkedin"];
  const steps = isMentor ? mentorSteps : menteeSteps;
  const total = steps.length;
  const current = steps[step];
  const canSkip = ["country","linkedin","arrived","company","story","languages","education"].includes(current);

  const validate = () => {
    if (current==="account") {
      if (!form.firstName.trim()) return "Please enter your first name.";
      if (!form.email.includes("@")) return "Please enter a valid email.";
      if (form.password.length < 6) return "Password must be at least 6 characters.";
    }
    if (current==="city" && !form.city) return "Please select your city.";
    if (current==="profession" && !form.profession.trim()) return isMentor ? "Please enter your job title." : "Please enter your professional background.";
    if (current==="experience" && !form.yearsExp) return "Please select your years of experience.";
    if (current==="m_experience" && !form.yearsExp) return "Please select your years of experience.";
    if (current==="industry" && (!form.industries || form.industries.length === 0)) return "Please select at least one industry.";
    if (current==="m_industry" && (!form.industries || form.industries.length === 0)) return "Please select at least one industry.";
    if (current==="goals" && (!form.menteeGoals || form.menteeGoals.length === 0)) return "Please select at least one goal.";
    if (current==="blurb" && !form.blurb.trim()) return "Please write a short intro.";
    return null;
  };

  const next = () => {
    const e = validate(); if (e) { setErr(e); return; }
    setErr("");
    if (step < total - 1) setStep(s=>s+1);
    else onComplete({ ...form, role });
  };

  const back = () => { if (step===0) onBack(); else { setStep(s=>s-1); setErr(""); } };

  const TITLES = {
    account:      "Create your account",
    city:         "Which city are you in?",
    profession:   isMentor ? "What's your job title?" : "What's your field?",
    education:    "Your highest education",
    m_experience: "Years of experience?",
    m_industry:   "What's your industry?",
    goals:        "What do you want to achieve?",
    company:      "Where do you work?",
    experience:   "Years of experience?",
    industry:     "What's your industry?",
    languages:    "Languages you speak",
    areas:        "How can you help?",
    blurb:        "Introduce yourself",
    story:        "Share your story",
    arrived:      "When did you arrive?",
    linkedin:     "Your LinkedIn",
  };

  const SUBS = {
    account:"",
    city:"",
    profession: isMentor ? "" : "Your professional background in your home country.",
    education:"Optional — helps mentors understand your qualifications.",
    m_experience:"In your professional field.",
    m_industry:"Select all that apply.",
    goals:"What would you like to get out of mentorship?",
    company:"Current employer",
    experience:"In your professional field",
    industry:"Select all that apply.",
    languages:"Select all that apply",
    areas:"Select all that apply",
    blurb:"2–3 sentences. Keep it real.",
    story:"What would you tell yourself arriving in Canada?",
    arrived:"",
    linkedin:"Optional",
  };

  return (
    <div style={{ minHeight:"100vh", backgroundColor:WH, fontFamily:F, color:BK, display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto" }}>

      {/* Header */}
      <div style={{ padding:"18px 24px 14px", borderBottom:`1px solid ${BD}` }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <button onClick={back} style={{ background:"none", border:"none", color:GR, fontSize:22, cursor:"pointer", padding:0, lineHeight:1 }}>←</button>
          <Logo/>
          {canSkip
            ? <button onClick={next} style={{ background:"none", border:"none", color:GR, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:F, padding:0 }}>Skip</button>
            : <div style={{ width:40 }}/>
          }
        </div>
        {/* Progress dots */}
        <ProgressDots step={step} total={total}/>
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:"auto", padding:"32px 24px 120px" }}>

        {/* Title */}
        <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:26, fontWeight:900, color:BK, lineHeight:1.2, marginBottom: SUBS[current] ? 6 : 0 }}>{TITLES[current]}</div>
          {SUBS[current] && <div style={{ fontSize:14, color:GR, fontWeight:500 }}>{SUBS[current]}</div>}
        </div>

        {/* Account */}
        {current==="account" && <>
          <div style={{ display:"flex", gap:10 }}>
            <div style={{ flex:1 }}><Field label="First name" value={form.firstName} onChange={e=>set("firstName",e.target.value)} placeholder="First" autoFocus/></div>
            <div style={{ flex:1 }}><Field label="Last name" value={form.lastName} onChange={e=>set("lastName",e.target.value)} placeholder="Last"/></div>
          </div>
          <Field label="Email" type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="you@email.com"/>
          <Field label="Password" type="password" value={form.password} onChange={e=>set("password",e.target.value)} placeholder="Min. 6 characters"/>
          <div style={{ fontSize:12, color:GR, marginTop:-8 }}>Use 6+ characters including a number.</div>
        </>}

        {/* City */}
        {current==="city" && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {CITIES.map(c=><PillBtn key={c} label={c} active={form.city===c} onClick={()=>set("city",c)}/>)}
          </div>
        )}

        {/* Profession */}
        {current==="profession" && (
          <Field placeholder={isMentor?"e.g. Senior Product Manager":"e.g. Civil Engineer, 6 years"} value={form.profession} onChange={e=>set("profession",e.target.value)} autoFocus/>
        )}

        {/* Company */}
        {current==="company" && (
          <div>
            <Field placeholder="e.g. Shopify, RBC, Vancouver General…" value={form.company} onChange={e=>set("company",e.target.value)} autoFocus/>
            <div style={{ fontSize:12, color:GR, marginTop:-8 }}>Tap Skip above if you'd prefer not to share.</div>
          </div>
        )}

        {/* Experience */}
        {current==="experience" && (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {EXP.map(y=>{
              const active = form.yearsExp===y;
              return (
                <button key={y} onClick={()=>set("yearsExp",y)} style={{ padding:"16px 20px", borderRadius:14, border:`2px solid ${active?G:BD}`, backgroundColor:active?GL:WH, display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", fontFamily:F, transition:"all .15s" }}>
                  <span style={{ fontSize:16, fontWeight:active?800:600, color:active?G:BK }}>{y}</span>
                  {active && <span style={{ fontSize:16, color:G }}>✓</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Industry — multi-select */}
        {current==="industry" && (
          <div>
            <div style={{ fontSize:13, color:GR, marginBottom:12, fontWeight:500 }}>Select all that apply.</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {INDUSTRIES.map(i=><PillBtn key={i} label={i} active={(form.industries||[]).includes(i)} onClick={()=>tog("industries",i)}/>)}
            </div>
          </div>
        )}

        {/* Languages — chips + custom input */}
        {current==="languages" && (
          <div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
              {LANGUAGES.map(l=><PillBtn key={l} label={l} active={(form.languages||[]).includes(l)} onClick={()=>tog("languages",l)}/>)}
            </div>
            <div style={{ fontSize:12, color:GR, fontWeight:700, marginBottom:6 }}>Don't see yours? Add it:</div>
            <div style={{ display:"flex", gap:8 }}>
              <input
                id="lang-custom"
                placeholder="e.g. Amharic, Somali, Bengali…"
                style={{ flex:1, padding:"11px 14px", border:`1.5px solid ${BD}`, borderRadius:10, fontSize:13, fontFamily:F, outline:"none", color:BK }}
                onKeyDown={e => {
                  if (e.key==="Enter" && e.target.value.trim()) {
                    const val = e.target.value.trim();
                    if (!(form.languages||[]).includes(val)) tog("languages", val);
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.getElementById("lang-custom");
                  const val = input?.value?.trim();
                  if (val && !(form.languages||[]).includes(val)) { tog("languages", val); input.value = ""; }
                }}
                style={{ padding:"11px 16px", backgroundColor:G, border:"none", borderRadius:10, color:WH, fontSize:13, fontWeight:800, cursor:"pointer", fontFamily:F }}>
                Add
              </button>
            </div>
            {(form.languages||[]).length > 0 && (
              <div style={{ marginTop:12, display:"flex", flexWrap:"wrap", gap:6 }}>
                {form.languages.map(l => (
                  <span key={l} style={{ fontSize:12, padding:"4px 10px", borderRadius:20, backgroundColor:GL, color:G, fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>
                    {l}
                    <button onClick={()=>tog("languages",l)} style={{ background:"none", border:"none", color:G, fontSize:14, cursor:"pointer", padding:0, lineHeight:1 }}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {current==="education" && (
          <div>
            {["High School","College / Diploma","Bachelor's Degree","Master's Degree","PhD / Doctorate","Professional (MD, JD, etc.)","Trade Certification","Other"].map(e=>{
              const active = form.education===e;
              return (
                <button key={e} onClick={()=>set("education",e)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", padding:"15px 18px", borderRadius:14, border:`2px solid ${active?G:BD}`, backgroundColor:active?GL:WH, marginBottom:9, cursor:"pointer", fontFamily:F, transition:"all .15s" }}>
                  <span style={{ fontSize:15, fontWeight:active?800:600, color:active?G:BK }}>{e}</span>
                  {active && <span style={{ color:G, fontSize:16 }}>✓</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Mentee years of experience */}
        {current==="m_experience" && (
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {EXP.map(y=>{
              const active = form.yearsExp===y;
              return (
                <button key={y} onClick={()=>set("yearsExp",y)} style={{ padding:"15px 18px", borderRadius:14, border:`2px solid ${active?G:BD}`, backgroundColor:active?GL:WH, display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", fontFamily:F, transition:"all .15s" }}>
                  <span style={{ fontSize:15, fontWeight:active?800:600, color:active?G:BK }}>{y}</span>
                  {active && <span style={{ color:G, fontSize:16 }}>✓</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Mentee industry */}
        {current==="m_industry" && (
          <div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {INDUSTRIES.map(i=><PillBtn key={i} label={i} active={(form.industries||[]).includes(i)} onClick={()=>tog("industries",i)}/>)}
            </div>
          </div>
        )}

        {/* Mentee goals */}
        {current==="goals" && (
          <div>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {[
                "Get my credentials recognized",
                "Find a job in my field",
                "Understand the Canadian workplace",
                "Build my professional network",
                "Improve my resume & interview skills",
                "Navigate a career change",
                "Start my own business",
                "Improve my English or French",
                "Get guidance on immigration & PR",
                "General career advice",
              ].map(g=>{
                const active = (form.menteeGoals||[]).includes(g);
                return (
                  <button key={g} onClick={()=>tog("menteeGoals",g)} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderRadius:14, border:`2px solid ${active?G:BD}`, backgroundColor:active?GL:WH, cursor:"pointer", fontFamily:F, transition:"all .15s", textAlign:"left" }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", border:`2px solid ${active?G:BD}`, backgroundColor:active?G:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {active && <span style={{ color:WH, fontSize:11, fontWeight:900 }}>✓</span>}
                    </div>
                    <span style={{ fontSize:14, fontWeight:active?700:500, color:active?G:BK, lineHeight:1.4 }}>{g}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {/* Areas — mentor only */}
        {current==="areas" && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {AREAS.map(a=><PillBtn key={a} label={a} active={form.mentorAreas.includes(a)} onClick={()=>tog("mentorAreas",a)}/>)}
          </div>
        )}

        {/* Blurb */}
        {current==="blurb" && (
          <div>
            <textarea value={form.blurb} onChange={e=>set("blurb",e.target.value.slice(0,160))}
              placeholder={isMentor
                ? "e.g. PM at Shopify. Spent 8 months getting rejected before landing my first Canadian role. Here to help you skip that part."
                : "e.g. UX designer from Korea, 6 years experience. Looking for help breaking into the Canadian tech market."}
              rows={4} style={{ width:"100%", padding:"14px 16px", backgroundColor:WH, border:`2px solid ${BD}`, borderRadius:14, color:BK, fontSize:14, outline:"none", fontFamily:F, boxSizing:"border-box", resize:"none", lineHeight:1.65, fontWeight:500 }}/>
            <div style={{ textAlign:"right", fontSize:11, color:GR, marginTop:4 }}>{form.blurb.length}/160</div>
          </div>
        )}

        {/* Personal story — optional */}
        {current==="story" && (
          <div>
            <textarea value={form.personalStory} onChange={e=>set("personalStory",e.target.value.slice(0,400))}
              placeholder="e.g. I landed in Toronto in 2015 with two suitcases and zero contacts. Three rejections in, I almost gave up. Now I lead a team of 12. I mentor because I wish someone had been there for me."
              rows={6} style={{ width:"100%", padding:"14px 16px", backgroundColor:WH, border:`2px solid ${BD}`, borderRadius:14, color:BK, fontSize:14, outline:"none", fontFamily:F, boxSizing:"border-box", resize:"none", lineHeight:1.65, fontWeight:500 }}/>
            <div style={{ textAlign:"right", fontSize:11, color:GR, marginTop:4 }}>{form.personalStory.length}/400</div>
            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:12, color:GR, fontWeight:700, marginBottom:8 }}>Need a nudge?</div>
              {["What was the hardest part of your Canadian career journey?","What do you wish someone had told you when you started?","What's one moment that changed everything for you?"].map(p=>(
                <button key={p} onClick={()=>!form.personalStory&&set("personalStory",p)} style={{ display:"block", width:"100%", textAlign:"left", padding:"11px 14px", backgroundColor:BG, border:`1px solid ${BD}`, borderRadius:10, color:GR, fontSize:12, cursor:"pointer", fontFamily:F, marginBottom:7, fontWeight:500, lineHeight:1.5 }}>
                  💬 {p}
                </button>
              ))}
            </div>
            <div style={{ fontSize:12, color:GR, marginTop:8 }}>Tap Skip above if you'd prefer to do this later.</div>
          </div>
        )}

        {/* Arrived — mentees only */}
        {current==="arrived" && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {YEARS.map(y=><PillBtn key={y} label={y} active={form.arrivalYear===y} onClick={()=>set("arrivalYear",y)}/>)}
          </div>
        )}

        {/* LinkedIn */}
        {current==="linkedin" && (
          <div>
            <Field placeholder="linkedin.com/in/yourname" value={form.linkedinUrl} onChange={e=>set("linkedinUrl",e.target.value)} autoFocus/>
            <div style={{ fontSize:12, color:GR, lineHeight:1.6, marginTop:-6 }}>Adds credibility. Tap Skip to do this later.</div>
          </div>
        )}

        {err && <div style={{ fontSize:13, color:ER, marginTop:16, padding:"12px 14px", backgroundColor:"#fef2f2", borderRadius:10, border:"1px solid #fecaca", fontWeight:600 }}>{err}</div>}
      </div>

      {/* CTA */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, padding:"16px 24px 36px", backgroundColor:WH, borderTop:`1px solid ${BD}`, boxSizing:"border-box" }}>
        <PrimaryBtn onClick={next}>
          {step===total-1 ? "Create my profile 🎉" : "Continue →"}
        </PrimaryBtn>
      </div>
    </div>
  );
}

// ── Schedule Modal ────────────────────────────────────────
function ScheduleModal({ mentor, existing, onClose, onConfirm, onCancel }) {
  const today = new Date();
  const TIMES = ["9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
  const DAYS = Array.from({length:7},(_,i)=>{const d=new Date(today);d.setDate(today.getDate()+i+1);return{label:d.toLocaleDateString("en-CA",{weekday:"short",month:"short",day:"numeric"})};});
  const [selDay,setSelDay]=useState(existing?.dayIdx??null);
  const [selTime,setSelTime]=useState(existing?.time||null);
  const isEdit=!!existing;
  return (
    <div style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,.5)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={onClose}>
      <div style={{backgroundColor:WH,borderRadius:"20px 20px 0 0",padding:"24px 22px 40px",width:"100%",maxWidth:480,margin:"0 auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div>
            <div style={{fontSize:17,fontWeight:900,color:BK}}>{isEdit?"Edit Coffee Chat":"Schedule a Coffee Chat"}</div>
            <div style={{fontSize:12,color:GR,marginTop:2}}>with {mentor.name}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:`1px solid ${BD}`,borderRadius:"50%",width:32,height:32,color:GR,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        <div style={{fontSize:12,color:GR,fontWeight:700,marginBottom:10}}>Choose a day</div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:12,marginBottom:16}}>
          {DAYS.map((d,i)=>(
            <button key={i} onClick={()=>setSelDay(i)} style={{flexShrink:0,padding:"10px 12px",borderRadius:10,border:`2px solid ${selDay===i?G:BD}`,backgroundColor:selDay===i?GL:BG,color:selDay===i?G:BK,fontSize:11,fontWeight:selDay===i?800:600,cursor:"pointer",fontFamily:F,textAlign:"center",minWidth:64}}>
              {d.label.split(",")[0]}<br/><span style={{fontSize:14,fontWeight:900}}>{d.label.split(" ").pop()}</span>
            </button>
          ))}
        </div>
        <div style={{fontSize:12,color:GR,fontWeight:700,marginBottom:10}}>Choose a time</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:22}}>
          {TIMES.map(t=>(
            <button key={t} onClick={()=>setSelTime(t)} style={{padding:"9px 14px",borderRadius:10,border:`2px solid ${selTime===t?G:BD}`,backgroundColor:selTime===t?GL:BG,color:selTime===t?G:BK,fontSize:12,fontWeight:selTime===t?800:600,cursor:"pointer",fontFamily:F}}>{t}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          {isEdit&&<button onClick={onCancel} style={{flex:1,padding:"13px",backgroundColor:"#fef2f2",border:"1px solid #fecaca",borderRadius:12,color:ER,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F}}>Cancel</button>}
          <button onClick={()=>selDay!==null&&selTime&&onConfirm({mentor,day:DAYS[selDay].label,dayIdx:selDay,time:selTime})} disabled={selDay===null||!selTime}
            style={{flex:2,padding:"13px",backgroundColor:selDay!==null&&selTime?G:BD,border:"none",borderRadius:12,color:selDay!==null&&selTime?WH:GR,fontSize:14,fontWeight:800,cursor:selDay!==null&&selTime?"pointer":"not-allowed",fontFamily:F}}>
            {selDay!==null&&selTime?(isEdit?"Update ✓":"☕ Confirm"):"Select a day & time"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Settings Modal ────────────────────────────────────────
function SettingsModal({ user, onClose, onUpdate, onSignOut }) {
  const [onBreak,setOnBreak]=useState(user.onBreak||false);
  const save=()=>{onUpdate({...user,onBreak});onClose();};
  return (
    <div style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,.5)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={onClose}>
      <div style={{backgroundColor:WH,borderRadius:"20px 20px 0 0",padding:"24px 22px 40px",width:"100%",maxWidth:480,margin:"0 auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <div style={{fontSize:18,fontWeight:900,color:BK}}>Settings</div>
          <button onClick={onClose} style={{background:"none",border:`1px solid ${BD}`,borderRadius:"50%",width:32,height:32,color:GR,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        {/* Coffee break */}
        <div style={{padding:"16px",backgroundColor:onBreak?"#fffbeb":GL,borderRadius:14,border:`1.5px solid ${onBreak?"#fcd34d":G}`,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:14,fontWeight:800,color:BK,marginBottom:2}}>☕ Coffee Break</div>
              <div style={{fontSize:12,color:GR}}>{onBreak?"On break — no new requests":"Pause new requests temporarily"}</div>
            </div>
            <button onClick={()=>setOnBreak(b=>!b)} style={{width:48,height:28,borderRadius:14,border:"none",backgroundColor:onBreak?"#f59e0b":G,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
              <div style={{width:22,height:22,borderRadius:"50%",backgroundColor:WH,position:"absolute",top:3,left:onBreak?23:3,transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
            </button>
          </div>
        </div>
        {[["🔔","Notifications","Email and push preferences"],["🔒","Privacy","PIPEDA compliant · Data stays in Canada"],["❓","Help","FAQs and contact"]].map(([ic,t,s])=>(
          <div key={t} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",backgroundColor:BG,borderRadius:12,border:`1px solid ${BD}`,marginBottom:8,cursor:"pointer"}}>
            <span style={{fontSize:20}}>{ic}</span>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:BK}}>{t}</div><div style={{fontSize:11,color:GR}}>{s}</div></div>
            <span style={{color:GR}}>›</span>
          </div>
        ))}
        <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:8}}>
          <PrimaryBtn onClick={save}>Save Settings</PrimaryBtn>
          <button onClick={onSignOut} style={{width:"100%",padding:"13px",backgroundColor:WH,border:`1.5px solid ${BD}`,borderRadius:12,color:ER,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:F}}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}

// ── Profile Page ──────────────────────────────────────────
function ProfilePage({ user, onClose, onSave }) {
  useFont();
  const isMentor = user.role === "mentor" || user.role === "both";
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const tog = (k,v) => set(k, (form[k]||[]).includes(v) ? (form[k]||[]).filter(x=>x!==v) : [...(form[k]||[]),v]);

  const AREAS     = ["Resume & Job Search","Interview Prep","Credential Recognition","Canadian Workplace","Networking","LinkedIn","Salary Negotiation","Career Pivot"];
  const LANGUAGES = ["English","French","Tagalog","Mandarin","Hindi","Arabic","Spanish","Punjabi","Korean","Portuguese","Ukrainian","Urdu"];
  const CITIES    = ["Toronto","Vancouver","Calgary","Montréal","Ottawa","Edmonton","Winnipeg","Halifax","Other"];

  const save = () => { onSave(form); setEditing(false); };

  return (
    <div style={{ position:"fixed", inset:0, backgroundColor:WH, zIndex:250, display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto", fontFamily:F }}>

      {/* Header */}
      <div style={{ padding:"14px 20px", borderBottom:`1px solid ${BD}`, display:"flex", alignItems:"center", justifyContent:"space-between", backgroundColor:WH, boxShadow:"0 1px 6px rgba(0,0,0,.05)" }}>
        <button onClick={onClose} style={{ background:"none", border:"none", color:GR, fontSize:22, cursor:"pointer", padding:0, lineHeight:1 }}>←</button>
        <div style={{ fontSize:16, fontWeight:900, color:BK }}>My Profile</div>
        <button onClick={() => editing ? save() : setEditing(true)} style={{ padding:"7px 16px", backgroundColor:editing?G:BG, border:`1.5px solid ${editing?G:BD}`, borderRadius:20, color:editing?WH:BK, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:F }}>
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"20px 20px 40px" }}>

        {/* Profile card preview */}
        <div style={{ backgroundColor:BG, borderRadius:20, overflow:"hidden", marginBottom:20, border:`1px solid ${BD}` }}>
          {/* Green top band */}
          <div style={{ height:70, background:`linear-gradient(135deg,#034732,${G})`, position:"relative" }}>
            <div style={{ position:"absolute", bottom:-32, left:20, width:64, height:64, borderRadius:"50%", backgroundColor:GL, border:`3px solid ${WH}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>
              {isMentor ? "🌟" : "🎯"}
            </div>
          </div>
          <div style={{ padding:"40px 20px 20px" }}>
            <div style={{ fontSize:20, fontWeight:900, color:BK, marginBottom:2 }}>{form.firstName} {form.lastName}</div>
            <div style={{ fontSize:13, color:G, fontWeight:700, marginBottom:4 }}>{form.profession || (isMentor?"Mentor":"Mentee")}{form.company?` · ${form.company}`:""}</div>
            <div style={{ fontSize:12, color:GR, marginBottom:12 }}>
              {form.city?`📍 ${form.city}`:""}{form.country?` · 🌍 ${form.country}`:""}
              {form.arrivalYear?` · 🇨🇦 Since ${form.arrivalYear}`:""}
            </div>
            {form.blurb && <div style={{ fontSize:13, color:GR, lineHeight:1.65, fontStyle:"italic", padding:"12px 14px", backgroundColor:WH, borderRadius:10, border:`1px solid ${BD}`, marginBottom:12 }}>"{form.blurb}"</div>}
            {(form.languages||[]).length>0 && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
                {form.languages.map(l=><span key={l} style={{ fontSize:11, padding:"3px 10px", borderRadius:20, backgroundColor:GL, color:G, fontWeight:700 }}>💬 {l}</span>)}
              </div>
            )}
            {(form.mentorAreas||[]).length>0 && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {form.mentorAreas.map(a=><span key={a} style={{ fontSize:11, padding:"3px 10px", borderRadius:20, backgroundColor:BG, color:GR, border:`1px solid ${BD}`, fontWeight:600 }}>{a}</span>)}
              </div>
            )}
          </div>
        </div>

        {/* Edit fields */}
        {editing ? <>
          <div style={{ fontSize:12, color:G, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", marginBottom:14 }}>Edit your profile</div>

          <div style={{ display:"flex", gap:10, marginBottom:14 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:GR, fontWeight:700, marginBottom:5 }}>First name</div>
              <input value={form.firstName} onChange={e=>set("firstName",e.target.value)} style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${BD}`, borderRadius:10, fontSize:14, fontFamily:F, outline:"none", boxSizing:"border-box", fontWeight:600, color:BK }}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:GR, fontWeight:700, marginBottom:5 }}>Last name</div>
              <input value={form.lastName} onChange={e=>set("lastName",e.target.value)} style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${BD}`, borderRadius:10, fontSize:14, fontFamily:F, outline:"none", boxSizing:"border-box", fontWeight:600, color:BK }}/>
            </div>
          </div>

          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:GR, fontWeight:700, marginBottom:5 }}>{isMentor?"Job title":"Professional background"}</div>
            <input value={form.profession} onChange={e=>set("profession",e.target.value)} style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${BD}`, borderRadius:10, fontSize:14, fontFamily:F, outline:"none", boxSizing:"border-box", fontWeight:600, color:BK }}/>
          </div>

          {isMentor && <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:GR, fontWeight:700, marginBottom:5 }}>Company</div>
            <input value={form.company||""} onChange={e=>set("company",e.target.value)} style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${BD}`, borderRadius:10, fontSize:14, fontFamily:F, outline:"none", boxSizing:"border-box", fontWeight:600, color:BK }}/>
          </div>}

          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:GR, fontWeight:700, marginBottom:8 }}>City</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {CITIES.map(c=><button key={c} onClick={()=>set("city",c)} style={{ padding:"7px 14px", borderRadius:20, border:`1.5px solid ${form.city===c?G:BD}`, backgroundColor:form.city===c?G:WH, color:form.city===c?WH:BK, fontSize:12, fontWeight:form.city===c?800:600, cursor:"pointer", fontFamily:F }}>{c}</button>)}
            </div>
          </div>

          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:GR, fontWeight:700, marginBottom:5 }}>Your intro</div>
            <textarea value={form.blurb||""} onChange={e=>set("blurb",e.target.value.slice(0,160))} rows={3}
              style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${BD}`, borderRadius:10, fontSize:13, fontFamily:F, outline:"none", boxSizing:"border-box", resize:"none", lineHeight:1.6, color:BK, fontWeight:500 }}/>
            <div style={{ textAlign:"right", fontSize:10, color:GR, marginTop:2 }}>{(form.blurb||"").length}/160</div>
          </div>

          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:GR, fontWeight:700, marginBottom:8 }}>Languages</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {LANGUAGES.map(l=><button key={l} onClick={()=>tog("languages",l)} style={{ padding:"7px 14px", borderRadius:20, border:`1.5px solid ${(form.languages||[]).includes(l)?G:BD}`, backgroundColor:(form.languages||[]).includes(l)?G:WH, color:(form.languages||[]).includes(l)?WH:BK, fontSize:12, fontWeight:(form.languages||[]).includes(l)?800:600, cursor:"pointer", fontFamily:F }}>{l}</button>)}
            </div>
          </div>

          {isMentor && <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:GR, fontWeight:700, marginBottom:8 }}>I can help with</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {AREAS.map(a=><button key={a} onClick={()=>tog("mentorAreas",a)} style={{ padding:"7px 14px", borderRadius:20, border:`1.5px solid ${(form.mentorAreas||[]).includes(a)?G:BD}`, backgroundColor:(form.mentorAreas||[]).includes(a)?G:WH, color:(form.mentorAreas||[]).includes(a)?WH:BK, fontSize:12, fontWeight:(form.mentorAreas||[]).includes(a)?800:600, cursor:"pointer", fontFamily:F }}>{a}</button>)}
            </div>
          </div>}

          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:GR, fontWeight:700, marginBottom:5 }}>LinkedIn URL</div>
            <input value={form.linkedinUrl||""} onChange={e=>set("linkedinUrl",e.target.value)} placeholder="linkedin.com/in/yourname"
              style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${BD}`, borderRadius:10, fontSize:13, fontFamily:F, outline:"none", boxSizing:"border-box", color:BK }}/>
          </div>

          <div style={{ display:"flex", gap:10, marginTop:8 }}>
            <button onClick={()=>setEditing(false)} style={{ flex:1, padding:"14px", backgroundColor:BG, border:`1px solid ${BD}`, borderRadius:12, color:GR, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:F }}>Cancel</button>
            <button onClick={save} style={{ flex:2, padding:"14px", backgroundColor:G, border:"none", borderRadius:12, color:WH, fontSize:14, fontWeight:900, cursor:"pointer", fontFamily:F }}>Save changes</button>
          </div>

        </> : <>
          {/* View mode — stats & details */}
          <div style={{ fontSize:12, color:G, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", marginBottom:14 }}>Profile details</div>

          {[
            ["📧","Email", form.email],
            ["📍","City",  form.city],
            ["🌍","From",  form.country],
            ["🇨🇦","Arrived", form.arrivalYear ? `Since ${form.arrivalYear}` : null],
            ["🔗","LinkedIn", form.linkedinUrl],
            isMentor && ["🏢","Company", form.company],
            isMentor && ["⏱","Experience", form.yearsExp],
          ].filter(Boolean).map(([icon,label,val]) => val ? (
            <div key={label} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", backgroundColor:BG, borderRadius:12, border:`1px solid ${BD}`, marginBottom:8 }}>
              <span style={{ fontSize:18, width:24, textAlign:"center" }}>{icon}</span>
              <div>
                <div style={{ fontSize:11, color:GR, fontWeight:600 }}>{label}</div>
                <div style={{ fontSize:13, color:BK, fontWeight:700 }}>{val}</div>
              </div>
            </div>
          ) : null)}

          {form.personalStory && (
            <div style={{ marginTop:8, padding:"14px 16px", backgroundColor:BG, borderRadius:14, border:`1px solid ${BD}` }}>
              <div style={{ fontSize:11, color:G, fontWeight:800, textTransform:"uppercase", letterSpacing:".1em", marginBottom:8 }}>Your story</div>
              <div style={{ fontSize:13, color:GR, lineHeight:1.7 }}>{form.personalStory}</div>
            </div>
          )}
        </>}
      </div>
    </div>
  );
}

// ── Invite Modal ──────────────────────────────────────────
function InviteModal({ invite, onClose, onAccept, onDecline, onReschedule }) {
  return (
    <div style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:24}} onClick={onClose}>
      <div style={{backgroundColor:WH,borderRadius:20,padding:"28px 24px",maxWidth:360,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:40,marginBottom:12}}>☕</div>
          <div style={{fontSize:18,fontWeight:900,color:BK,marginBottom:4}}>Coffee Chat Request</div>
          <div style={{fontSize:13,color:GR}}>from {invite.name}</div>
        </div>
        <div style={{backgroundColor:BG,borderRadius:12,padding:"14px",marginBottom:20,textAlign:"center",border:`1px solid ${BD}`}}>
          <div style={{fontSize:14,fontWeight:800,color:BK}}>📅 {invite.day}</div>
          <div style={{fontSize:13,color:GR,marginTop:2}}>⏰ {invite.time}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <PrimaryBtn onClick={onAccept}>✓ Accept</PrimaryBtn>
          <button onClick={onReschedule} style={{padding:"13px",backgroundColor:BG,border:`1.5px solid ${BD}`,borderRadius:12,color:BK,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:F}}>📅 Suggest different time</button>
          <button onClick={onDecline} style={{padding:"13px",backgroundColor:"#fef2f2",border:"1px solid #fecaca",borderRadius:12,color:ER,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:F}}>✕ Decline</button>
        </div>
      </div>
    </div>
  );
}

// ── Tutorial ──────────────────────────────────────────────
function Tutorial({ onDone, role }) {
  const [step,setStep]=useState(0);
  const isMentor = role === "mentor" || role === "both";

  const MENTEE_STEPS=[
    {icon:"🌱",title:"Welcome, newcomer!",       body:"You've taken a big step. Level Up connects you with mentors who've navigated Canada before you — and want to help."},
    {icon:"🔍",title:"Find your mentor",          body:"Browse mentor profiles. Read their stories. Request a coffee chat with someone whose path matches yours."},
    {icon:"📅",title:"Book a coffee chat",        body:"Pick a day and time. Confirmed sessions go straight to your calendar."},
    {icon:"💬",title:"Chat & ask anything",       body:"Message before or after sessions. No question is too small. They've been exactly where you are."},
    {icon:"📊",title:"Track your progress",       body:"Your dashboard logs every session — a record of your growth since arriving in Canada."},
  ];

  const MENTOR_STEPS=[
    {icon:"🌟",title:"Welcome, mentor!",          body:"Thank you for giving back. The guidance you share will change someone's Canadian story."},
    {icon:"👤",title:"Build your profile",        body:"Share your story, expertise, and what you can help with. Mentees will find you based on your experience."},
    {icon:"☕",title:"Accept coffee chats",       body:"Mentees request sessions with you. Accept, suggest a different time, or decline — you're always in control."},
    {icon:"💬",title:"Stay connected",            body:"Message mentees before and after sessions. A little ongoing support goes a long way."},
    {icon:"📊",title:"Track your impact",         body:"Your dashboard shows sessions completed and hours contributed — exportable for volunteer or CPD records."},
  ];

  const STEPS = isMentor ? MENTOR_STEPS : MENTEE_STEPS;
  const S=STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:24}}>
      <div style={{backgroundColor:WH,borderRadius:20,padding:"32px 28px",maxWidth:360,width:"100%",textAlign:"center",boxShadow:"0 24px 60px rgba(0,0,0,.15)"}}>
        <div style={{width:72,height:72,borderRadius:"50%",backgroundColor:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 16px",border:`2px solid ${G}22`}}>{S.icon}</div>
        <div style={{fontSize:10,color:G,letterSpacing:".2em",textTransform:"uppercase",fontWeight:700,marginBottom:6}}>{step+1} of {STEPS.length}</div>
        <div style={{fontSize:20,fontWeight:900,color:BK,marginBottom:8}}>{S.title}</div>
        <div style={{fontSize:14,color:GR,lineHeight:1.7,marginBottom:24}}>{S.body}</div>
        <ProgressDots step={step} total={STEPS.length}/>
        <div style={{display:"flex",gap:10,marginTop:20}}>
          {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{flex:1,padding:"12px",backgroundColor:BG,border:`1px solid ${BD}`,borderRadius:12,color:GR,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:F}}>Back</button>}
          <button onClick={()=>isLast?onDone():setStep(s=>s+1)} style={{flex:2,padding:"12px",backgroundColor:G,border:"none",borderRadius:12,color:WH,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:F}}>
            {isLast?"Let's go ☕":"Next →"}
          </button>
        </div>
        <button onClick={onDone} style={{background:"none",border:"none",color:GR,fontSize:12,cursor:"pointer",fontFamily:F,marginTop:12}}>Skip tutorial</button>
      </div>
    </div>
  );
}

// ── HOME ─────────────────────────────────────────────────
const MENTORS = [
  {id:1,name:"Priya Sharma",emoji:"👩🏽‍💻",color:"#7c3aed",role:"Product Manager",company:"Shopify",city:"Toronto, ON",from:"🇮🇳 India",arrived:"2017",blurb:"Spent 8 months rejected for 'no Canadian experience.' Now PM at Shopify. I'll show you what changed.",tags:["Tech","Resume","LinkedIn"],speaks:["English","Hindi"],sessions:42},
  {id:2,name:"Jean-François T.",emoji:"👨🏾‍💼",color:"#b45309",role:"Finance Director",company:"Desjardins",city:"Montréal, QC",from:"🇭🇦 Haiti",arrived:"2014",blurb:"Arrived with a finance degree no one recognized. Two years to break through — now I make it faster.",tags:["Finance","FR/EN","Quebec"],speaks:["French","English","Creole"],sessions:61},
  {id:3,name:"Amara Osei",emoji:"👩🏿‍⚕️",color:"#0369a1",role:"Nurse Manager",company:"VGH",city:"Vancouver, BC",from:"🇬🇭 Ghana",arrived:"2019",blurb:"IEN who navigated CRNBC in 6 months. I know every step and I'm here to walk you through it.",tags:["Healthcare","IEN","BC"],speaks:["English","Twi"],sessions:38},
  {id:4,name:"Mei-Lin Zhang",emoji:"👩🏻‍💻",color:"#065f46",role:"Software Engineer",company:"RBC",city:"Calgary, AB",from:"🇨🇳 China",arrived:"2020",blurb:"Cracked Canadian tech with no local experience. I'll give you the exact playbook.",tags:["Tech","Interviews","Fintech"],speaks:["English","Mandarin"],sessions:29},
];

function Home({ user:initUser, onSignOut }) {
  useFont();
  const [user,setUser]=useState(initUser);
  const [tab,setTab]=useState("home");
  const [showTutorial,setShowTutorial]=useState(true);
  const [showSettings,setShowSettings]=useState(false);
  const [showProfile,setShowProfile]=useState(false);
  const [expanded,setExpanded]=useState(null);
  const [scheduling,setScheduling]=useState(null);
  const [editSession,setEditSession]=useState(null);
  const [sessions,setSessions]=useState([]);
  const [requested,setRequested]=useState({});
  const [msgs,setMsgs]=useState([{id:1,name:"Priya Sharma",emoji:"👩🏽‍💻",color:"#7c3aed",role:"PM @ Shopify",lastMsg:"Let's work on your resume in the meantime.",time:"2h ago",unread:1,chat:[{text:"Hi! Looking forward to our session Thursday.",mine:false,time:"9:14 AM"},{text:"Me too! Should I prepare anything?",mine:true,time:"9:20 AM"},{text:"Let's work on your resume in the meantime.",mine:false,time:"9:33 AM"}]}]);
  const [activeChat,setActiveChat]=useState(null);
  const [chatInput,setChatInput]=useState("");
  const [showInvite,setShowInvite]=useState(false);
  const isMentor=user.role==="mentor";
  const unread=msgs.reduce((a,m)=>a+m.unread,0);
  const BAR=["J","F","M","A","M","J","J","A","S","O","N","D"];
  const currentMonth=new Date().getMonth();

  useEffect(()=>{if(!showTutorial){const t=setTimeout(()=>setShowInvite(true),3000);return()=>clearTimeout(t);}},[showTutorial]);

  const confirmSession=({mentor,day,dayIdx,time})=>{
    if(editSession){setSessions(s=>s.map(x=>x.id===editSession.id?{...x,day,dayIdx,time}:x));}
    else{setSessions(s=>[...s,{mentor,day,dayIdx,time,id:Date.now()}]);setRequested(r=>({...r,[mentor.id]:true}));}
    setScheduling(null);setEditSession(null);
  };

  const sendMsg=()=>{
    if(!chatInput.trim()||!activeChat)return;
    setMsgs(ms=>ms.map(m=>m.id===activeChat?{...m,chat:[...m.chat,{text:chatInput,mine:true,time:"Now"}],lastMsg:chatInput,unread:0}:m));
    setChatInput("");
  };

  const convo=msgs.find(m=>m.id===activeChat);

  const NAV = [
    {id:"home",     icon:"🏠", label:"Home"},
    {id:isMentor?"dashboard":"mentors", icon:isMentor?"📊":"🔍", label:isMentor?"Dashboard":"Mentors"},
    {id:"messages", icon:"💬", label:"Messages", badge:unread},
    {id:"profile",  icon:"👤", label:"Profile"},
  ];

  return (
    <div style={{height:"100vh",backgroundColor:WH,fontFamily:F,color:BK,display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto"}}>

      {/* Header */}
      <div style={{padding:"12px 20px",backgroundColor:WH,borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <Logo/>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {user.onBreak&&<div style={{fontSize:10,backgroundColor:"#fffbeb",border:"1px solid #fcd34d",color:"#92400e",padding:"3px 8px",borderRadius:20,fontWeight:700}}>☕ Break</div>}
          <button onClick={()=>setShowProfile(true)} style={{width:36,height:36,borderRadius:"50%",backgroundColor:GL,border:`2px solid ${G}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:"pointer"}}>{isMentor?"🌟":"🎯"}</button>
          <button onClick={()=>setShowSettings(true)} style={{width:36,height:36,borderRadius:"50%",backgroundColor:BG,border:`1px solid ${BD}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:"pointer"}}>⚙️</button>
        </div>
      </div>

      {/* Body */}
      <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>

        {/* HOME */}
        {tab==="home"&&<div style={{flex:1,overflowY:"auto",padding:"20px 20px 24px"}}>
          {/* Hero */}
          <div style={{padding:"22px 20px",marginBottom:18,backgroundColor:G,borderRadius:16,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",backgroundColor:"rgba(255,255,255,.08)"}}/>
            <div style={{fontSize:12,color:"rgba(255,255,255,.8)",marginBottom:6,fontWeight:700}}>👋 Welcome, {user.firstName}</div>
            <div style={{fontSize:20,fontWeight:900,lineHeight:1.3,marginBottom:8,color:WH}}>{isMentor?"Your mentor profile is live.":"Let's find your mentor."}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.7,marginBottom:16,fontWeight:500}}>{isMentor?"Mentees in your city are looking for your expertise.":"Browse mentors who know the Canadian landscape."}</div>
            <button onClick={()=>setTab(isMentor?"dashboard":"mentors")} style={{padding:"10px 20px",backgroundColor:WH,border:"none",borderRadius:22,color:G,fontSize:13,fontWeight:900,cursor:"pointer",fontFamily:F}}>
              ☕ {isMentor?"See Dashboard":"Find a Mentor"}
            </button>
          </div>

          {/* Profile quick view */}
          <div style={{backgroundColor:WH,borderRadius:14,border:`1px solid ${BD}`,padding:"14px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:44,height:44,borderRadius:"50%",backgroundColor:GL,border:`2px solid ${G}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{isMentor?"🌟":"🎯"}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:800,color:BK}}>{user.firstName} {user.lastName}</div>
              <div style={{fontSize:11,color:G,fontWeight:700}}>{user.profession||(isMentor?"Mentor":"Mentee")}</div>
              <div style={{fontSize:11,color:GR}}>{user.city?`📍 ${user.city}`:""}</div>
            </div>
            <button onClick={()=>setShowProfile(true)} style={{fontSize:11,padding:"7px 14px",backgroundColor:BG,border:`1px solid ${BD}`,borderRadius:20,color:GR,cursor:"pointer",fontFamily:F,fontWeight:700}}>View</button>
          </div>

          {/* Sessions */}
          <div style={{fontSize:12,color:GR,fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:".05em"}}>Upcoming Sessions</div>
          {sessions.length===0?(
            <div style={{backgroundColor:BG,borderRadius:14,border:`2px dashed ${BD}`,padding:"28px 20px",textAlign:"center"}}>
              <div style={{fontSize:32,marginBottom:10}}>📅</div>
              <div style={{fontSize:14,fontWeight:700,color:BK,marginBottom:6}}>No sessions yet</div>
              <div style={{fontSize:13,color:GR,marginBottom:14}}>Connect with a {isMentor?"mentee":"mentor"} to book your first coffee chat.</div>
              <button onClick={()=>setTab(isMentor?"dashboard":"mentors")} style={{padding:"9px 20px",backgroundColor:G,border:"none",borderRadius:22,color:WH,fontSize:12,cursor:"pointer",fontFamily:F,fontWeight:800}}>Browse {isMentor?"Mentees":"Mentors"} →</button>
            </div>
          ):sessions.map(s=>(
            <div key={s.id} style={{backgroundColor:WH,borderRadius:12,border:`1px solid ${BD}`,padding:"14px",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:38,height:38,borderRadius:"50%",backgroundColor:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{s.mentor.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:800,color:BK}}>☕ {s.mentor.name}</div>
                  <div style={{fontSize:11,color:G,fontWeight:700,marginTop:1}}>📅 {s.day} · {s.time}</div>
                </div>
                <button onClick={()=>{setEditSession(s);setScheduling(s.mentor);}} style={{fontSize:11,padding:"6px 12px",backgroundColor:BG,border:`1px solid ${BD}`,borderRadius:8,color:GR,cursor:"pointer",fontFamily:F,fontWeight:700}}>Edit</button>
              </div>
            </div>
          ))}
        </div>}

        {/* MENTORS */}
        {tab==="mentors"&&!isMentor&&<div style={{flex:1,overflowY:"auto"}}>
          <div style={{padding:"14px 18px 12px",backgroundColor:WH,borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontSize:17,fontWeight:900,color:BK}}>Mentors</div>
            <div style={{fontSize:11,color:G,fontWeight:800,backgroundColor:GL,padding:"4px 12px",borderRadius:20}}>{MENTORS.length} available</div>
          </div>
          <div style={{padding:"12px 16px 24px"}}>
            {MENTORS.map(m=>{
              const isExp=expanded===m.id;const isReq=requested[m.id];
              return(
                <div key={m.id} style={{backgroundColor:WH,borderRadius:16,border:`1.5px solid ${isExp?G:BD}`,marginBottom:12,overflow:"hidden",transition:"border-color .2s"}}>
                  <div onClick={()=>setExpanded(isExp?null:m.id)} style={{padding:"14px 16px",cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
                    <div style={{width:50,height:50,borderRadius:"50%",backgroundColor:m.color+"18",border:`2px solid ${m.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{m.emoji}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:15,fontWeight:900,color:BK}}>{m.name}</div>
                      <div style={{fontSize:12,color:m.color,fontWeight:700}}>{m.role} @ {m.company}</div>
                      <div style={{fontSize:11,color:GR}}>📍 {m.city}</div>
                    </div>
                    <div style={{fontSize:16,color:GR,transform:isExp?"rotate(180deg)":"rotate(0)",transition:"transform .2s"}}>▾</div>
                  </div>
                  {isExp&&<div style={{padding:"0 16px 16px",borderTop:`1px solid ${BD}`,paddingTop:12}}>
                    <div style={{fontSize:13,color:GR,lineHeight:1.7,fontStyle:"italic",marginBottom:12,padding:"10px 12px",backgroundColor:BG,borderRadius:10,border:`1px solid ${BD}`}}>"{m.blurb}"</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                      {m.tags.map(t=><span key={t} style={{fontSize:10,padding:"4px 10px",borderRadius:20,backgroundColor:GL,color:G,fontWeight:800}}>{t}</span>)}
                      {m.speaks.map(l=><span key={l} style={{fontSize:10,padding:"4px 10px",borderRadius:20,backgroundColor:BG,color:GR,border:`1px solid ${BD}`}}>💬 {l}</span>)}
                    </div>
                    <div style={{display:"flex",gap:7,marginBottom:12}}>
                      {[[m.sessions,"Sessions"],["4.9 ⭐","Rating"],["Since "+m.arrived,"Canada"]].map(([v,l])=>(
                        <div key={l} style={{flex:1,textAlign:"center",padding:"10px 6px",backgroundColor:BG,borderRadius:10,border:`1px solid ${BD}`}}>
                          <div style={{fontSize:14,fontWeight:900,color:BK}}>{v}</div>
                          <div style={{fontSize:9,color:GR,marginTop:1,fontWeight:600}}>{l}</div>
                        </div>
                      ))}
                    </div>
                    <button onClick={()=>isReq?null:setScheduling(m)} style={{width:"100%",padding:"13px",backgroundColor:isReq?GL:G,border:isReq?`1.5px solid ${G}`:"none",borderRadius:12,color:isReq?G:WH,fontSize:14,fontWeight:800,cursor:isReq?"default":"pointer",fontFamily:F,transition:"all .2s"}}>
                      {isReq?"✓ Session Scheduled":"☕ Request a Coffee Chat"}
                    </button>
                  </div>}
                </div>
              );
            })}
          </div>
        </div>}

        {/* MESSAGES */}
        {tab==="messages"&&<div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          {convo?(
            <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
              <div style={{padding:"12px 16px",backgroundColor:WH,borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                <button onClick={()=>setActiveChat(null)} style={{background:"none",border:"none",color:GR,fontSize:20,cursor:"pointer",padding:0,lineHeight:1}}>←</button>
                <div style={{width:36,height:36,borderRadius:"50%",backgroundColor:convo.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{convo.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:800,color:BK}}>{convo.name}</div>
                  <div style={{fontSize:11,color:GR}}>{convo.role}</div>
                </div>
                <button style={{fontSize:11,padding:"7px 14px",backgroundColor:GL,border:`1px solid ${G}`,borderRadius:20,color:G,cursor:"pointer",fontFamily:F,fontWeight:800}}>☕ Book</button>
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
                <div style={{textAlign:"center",marginBottom:14}}><span style={{fontSize:10,color:GR,backgroundColor:BG,padding:"4px 14px",borderRadius:20,border:`1px solid ${BD}`}}>Today</span></div>
                {convo.chat.map((msg,i)=>(
                  <div key={i} style={{marginBottom:12,display:"flex",justifyContent:msg.mine?"flex-end":"flex-start",alignItems:"flex-end",gap:8}}>
                    {!msg.mine&&<div style={{width:28,height:28,borderRadius:"50%",backgroundColor:convo.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{convo.emoji}</div>}
                    <div style={{maxWidth:"74%",display:"flex",flexDirection:"column",alignItems:msg.mine?"flex-end":"flex-start"}}>
                      <div style={{padding:"10px 14px",borderRadius:msg.mine?"18px 18px 4px 18px":"18px 18px 18px 4px",backgroundColor:msg.mine?G:WH,color:msg.mine?WH:BK,fontSize:13,lineHeight:1.55,fontWeight:500,border:msg.mine?"none":`1px solid ${BD}`}}>{msg.text}</div>
                      <div style={{fontSize:9,color:GR,marginTop:3}}>{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{padding:"10px 14px 20px",backgroundColor:WH,borderTop:`1px solid ${BD}`,display:"flex",gap:8,flexShrink:0}}>
                <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder="Type a message…"
                  style={{flex:1,padding:"11px 16px",backgroundColor:BG,border:`1.5px solid ${BD}`,borderRadius:24,color:BK,fontSize:13,outline:"none",fontFamily:F,fontWeight:500}}/>
                <button onClick={sendMsg} style={{width:42,height:42,borderRadius:"50%",backgroundColor:chatInput.trim()?G:BD,border:"none",cursor:chatInput.trim()?"pointer":"default",fontSize:16,flexShrink:0,transition:"background .15s",color:WH}}>→</button>
              </div>
            </div>
          ):(
            <div style={{flex:1,overflowY:"auto"}}>
              <div style={{padding:"14px 18px 12px",backgroundColor:WH,borderBottom:`1px solid ${BD}`}}>
                <div style={{fontSize:17,fontWeight:900,color:BK}}>Messages</div>
              </div>
              {msgs.length===0?(
                <div style={{padding:"48px 24px",textAlign:"center"}}>
                  <div style={{fontSize:40,marginBottom:14}}>💬</div>
                  <div style={{fontSize:15,fontWeight:800,color:BK,marginBottom:6}}>No messages yet</div>
                  <div style={{fontSize:13,color:GR,marginBottom:16,lineHeight:1.6}}>Connect with a {isMentor?"mentee":"mentor"} to start a conversation.</div>
                  <button onClick={()=>setTab(isMentor?"dashboard":"mentors")} style={{padding:"10px 22px",backgroundColor:G,border:"none",borderRadius:22,color:WH,fontSize:13,cursor:"pointer",fontFamily:F,fontWeight:800}}>Browse {isMentor?"Mentees":"Mentors"} →</button>
                </div>
              ):msgs.map(m=>(
                <div key={m.id} onClick={()=>{setActiveChat(m.id);setMsgs(ms=>ms.map(x=>x.id===m.id?{...x,unread:0}:x));}} style={{display:"flex",gap:12,alignItems:"center",padding:"14px 18px",cursor:"pointer",borderBottom:`1px solid ${BD}`,backgroundColor:WH}}>
                  <div style={{position:"relative",flexShrink:0}}>
                    <div style={{width:48,height:48,borderRadius:"50%",backgroundColor:m.color+"18",border:`1.5px solid ${m.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{m.emoji}</div>
                    {m.unread>0&&<div style={{position:"absolute",top:-2,right:-2,width:18,height:18,borderRadius:"50%",backgroundColor:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,color:WH}}>{m.unread}</div>}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                      <div style={{fontSize:14,fontWeight:m.unread?900:700,color:BK}}>{m.name}</div>
                      <div style={{fontSize:10,color:GR}}>{m.time}</div>
                    </div>
                    <div style={{fontSize:11,color:GR,marginBottom:2}}>{m.role}</div>
                    <div style={{fontSize:12,color:m.unread?BK:GR,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:m.unread?600:400}}>{m.lastMsg}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>}

        {/* DASHBOARD */}
        {tab==="dashboard"&&<div style={{flex:1,overflowY:"auto",padding:"16px 18px 24px"}}>
          <div style={{fontSize:18,fontWeight:900,color:BK,marginBottom:16}}>Dashboard</div>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {[[sessions.length,"Sessions","☕"],[sessions.length+"h","Hours","⏱"],[isMentor?"0":sessions.length,isMentor?"Mentees helped":"Mentors met","🤝"]].map(([v,l,ic])=>(
              <div key={l} style={{flex:1,backgroundColor:WH,border:`1px solid ${BD}`,borderRadius:14,padding:"16px 8px",textAlign:"center"}}>
                <div style={{fontSize:18,marginBottom:6}}>{ic}</div>
                <div style={{fontSize:22,fontWeight:900,color:G}}>{v}</div>
                <div style={{fontSize:10,color:GR,marginTop:2,fontWeight:600}}>{l}</div>
              </div>
            ))}
          </div>
          {/* Hours chart */}
          <div style={{backgroundColor:WH,borderRadius:16,border:`1px solid ${BD}`,padding:"16px",marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontSize:14,fontWeight:800,color:BK}}>Hours this year</div>
              <button style={{fontSize:11,padding:"5px 14px",backgroundColor:GL,border:`1px solid ${G}`,borderRadius:20,color:G,cursor:"pointer",fontFamily:F,fontWeight:800}}>Export</button>
            </div>
            <div style={{display:"flex",gap:3,alignItems:"flex-end",height:52,marginBottom:8}}>
              {BAR.map((m,i)=>{const h=i===currentMonth?sessions.length:0;const maxH=Math.max(sessions.length,1);return(<div key={m} style={{flex:1,borderRadius:4,backgroundColor:h>0?G:BG,border:`1px solid ${BD}`,height:h>0?`${(h/maxH)*46}px`:"6px",minHeight:6,transition:"height .5s"}}/>);})}
            </div>
            <div style={{display:"flex",gap:3}}>{BAR.map((m,i)=><div key={m} style={{flex:1,fontSize:8,color:i===currentMonth?G:GR,textAlign:"center",fontWeight:i===currentMonth?900:500}}>{m}</div>)}</div>
            <div style={{fontSize:11,color:GR,marginTop:10,textAlign:"center"}}>{sessions.length}h logged · Exportable for CPD records</div>
          </div>
          {/* Connections */}
          <div style={{backgroundColor:WH,borderRadius:16,border:`1px solid ${BD}`,padding:"16px",marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:800,color:BK,marginBottom:12}}>Connections</div>
            {Object.keys(requested).length===0?(
              <div style={{textAlign:"center",padding:"16px 0"}}>
                <div style={{fontSize:24,marginBottom:8}}>🤝</div>
                <div style={{fontSize:13,color:GR,marginBottom:12}}>No connections yet</div>
                <button onClick={()=>setTab("mentors")} style={{fontSize:12,padding:"8px 18px",backgroundColor:G,border:"none",borderRadius:22,color:WH,cursor:"pointer",fontFamily:F,fontWeight:800}}>Find a mentor →</button>
              </div>
            ):MENTORS.filter(m=>requested[m.id]).map(m=>(
              <div key={m.id} style={{display:"flex",gap:10,alignItems:"center",marginBottom:10,padding:"10px 12px",backgroundColor:BG,borderRadius:12,border:`1px solid ${BD}`}}>
                <div style={{width:36,height:36,borderRadius:"50%",backgroundColor:m.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{m.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:800,color:BK}}>{m.name}</div>
                  <div style={{fontSize:11,color:m.color,fontWeight:600}}>{m.role}</div>
                </div>
                <button onClick={()=>{setMsgs(ms=>[...ms,{id:Date.now(),name:m.name,emoji:m.emoji,color:m.color,role:m.role,lastMsg:"Say hello!",time:"Now",unread:0,chat:[]}]);setTab("messages");}} style={{fontSize:11,padding:"6px 12px",backgroundColor:GL,border:`1px solid ${G}`,borderRadius:10,color:G,cursor:"pointer",fontFamily:F,fontWeight:800}}>Message</button>
              </div>
            ))}
          </div>
        </div>}

        {/* PROFILE TAB */}
        {tab==="profile"&&<div style={{flex:1,overflowY:"auto"}}>
          <div style={{padding:"14px 18px 14px",backgroundColor:WH,borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:17,fontWeight:900,color:BK,marginBottom:6}}>My Profile</div>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <div style={{padding:"5px 14px",backgroundColor:G,borderRadius:20,fontSize:13,fontWeight:900,color:WH,display:"flex",alignItems:"center",gap:5}}>
                  {user.role==="mentor"&&<>🌟 <span>Mentor</span></>}
                  {user.role==="mentee"&&<>🎯 <span>Mentee</span></>}
                  {user.role==="both"&&<>🌟🎯 <span>Mentor & Mentee</span></>}
                </div>
                <div style={{fontSize:11,color:GR,fontWeight:500}}>
                  {user.role==="mentor"&&"Active"}
                  {user.role==="mentee"&&"Active"}
                  {user.role==="both"&&"Active"}
                </div>
              </div>
            </div>
            <button onClick={()=>setShowProfile(true)} style={{padding:"7px 16px",backgroundColor:G,border:"none",borderRadius:20,color:WH,fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:F}}>Edit</button>
          </div>

          {/* Role banner — unmissable */}
          <div style={{margin:"16px 16px 0",borderRadius:16,overflow:"hidden",border:`2px solid ${G}`,background:`linear-gradient(135deg,#022c1e,${G})`}}>
            <div style={{padding:"14px 20px",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:44,height:44,borderRadius:"50%",backgroundColor:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
                {user.role==="both"?"🌟🎯":user.role==="mentor"?"🌟":"🎯"}
              </div>
              <div>
                <div style={{fontSize:18,fontWeight:900,color:WH}}>
                  {user.role==="both"?"Mentor & Mentee":user.role==="mentor"?"Mentor":"Mentee"}
                </div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.75)",fontWeight:500,marginTop:1}}>
                  {user.role==="mentor"&&"Helping newcomers navigate Canada"}
                  {user.role==="mentee"&&"Building my career in Canada"}
                  {user.role==="both"&&"Giving back while still growing"}
                </div>
              </div>
            </div>
          </div>

          {/* Profile card — exactly how others see it */}
          <div style={{margin:"10px 16px 0",backgroundColor:WH,borderRadius:20,overflow:"hidden",border:`1px solid ${BD}`,boxShadow:"0 4px 20px rgba(0,0,0,.06)"}}>
            {/* Green header band */}
            <div style={{height:80,background:`linear-gradient(135deg,#022c1e,${G})`,position:"relative"}}>
              <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",backgroundColor:"rgba(255,255,255,.06)"}}/>
              <div style={{position:"absolute",bottom:-28,left:20,width:56,height:56,borderRadius:"50%",backgroundColor:GL,border:`3px solid ${WH}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>
                {isMentor?"🌟":"🎯"}
              </div>
            </div>
            <div style={{padding:"36px 20px 20px"}}>
              <div style={{fontSize:20,fontWeight:900,color:BK,marginBottom:6}}>{user.firstName} {user.lastName}</div>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6,flexWrap:"wrap"}}>
                <div style={{padding:"4px 12px",backgroundColor:G,borderRadius:20,fontSize:12,fontWeight:800,color:WH}}>
                  {user.role==="mentor"?"🌟 Mentor":user.role==="both"?"🌟🎯 Mentor & Mentee":"🎯 Mentee"}
                </div>
              </div>
              <div style={{fontSize:13,color:G,fontWeight:700,marginBottom:4}}>
                {user.profession||(isMentor?"Professional":"Professional")}{user.company?` · ${user.company}`:""}
              </div>
              <div style={{fontSize:12,color:GR,marginBottom:14}}>
                {user.city?`📍 ${user.city} `:""}{user.country?`· 🌍 ${user.country} `:""}{user.arrivalYear?`· 🇨🇦 Since ${user.arrivalYear}`:""}
              </div>
              {user.blurb&&<div style={{fontSize:13,color:GR,lineHeight:1.65,fontStyle:"italic",padding:"12px 14px",backgroundColor:BG,borderRadius:10,border:`1px solid ${BD}`,marginBottom:14}}>"{user.blurb}"</div>}
              {(user.languages||[]).length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {user.languages.map(l=><span key={l} style={{fontSize:11,padding:"4px 10px",borderRadius:20,backgroundColor:GL,color:G,fontWeight:700}}>💬 {l}</span>)}
              </div>}
              {(user.mentorAreas||[]).length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {user.mentorAreas.map(a=><span key={a} style={{fontSize:11,padding:"4px 10px",borderRadius:20,backgroundColor:BG,color:GR,border:`1px solid ${BD}`,fontWeight:600}}>{a}</span>)}
              </div>}
              {user.linkedinUrl&&<div style={{fontSize:12,color:"#1d4ed8",fontWeight:700,marginBottom:6}}>🔗 LinkedIn connected</div>}
              {user.onBreak&&<div style={{marginTop:8,padding:"8px 14px",backgroundColor:"#fffbeb",borderRadius:10,border:"1px solid #fcd34d",fontSize:12,color:"#92400e",fontWeight:700}}>☕ On a coffee break</div>}
            </div>
          </div>

          {/* How others see you note */}
          <div style={{margin:"12px 16px",padding:"12px 16px",backgroundColor:"#f0fdf4",borderRadius:12,border:`1px solid ${G}33`,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18}}>👁</span>
            <div style={{fontSize:12,color:G,fontWeight:600,lineHeight:1.5}}>This is exactly how {isMentor?"mentees":"mentors"} see your profile.</div>
          </div>

          {/* Details */}
          <div style={{margin:"4px 16px 24px"}}>
            <div style={{fontSize:11,color:G,fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",marginBottom:10,marginTop:4}}>Your details</div>
            {[
              ["📧","Email",      user.email],
              ["📍","City",       user.city],
              ["🌍","From",       user.country],
              ["🇨🇦","Arrived",   user.arrivalYear ? `Since ${user.arrivalYear}` : null],
              ["🔗","LinkedIn",   user.linkedinUrl],
              isMentor&&["🏢","Company",   user.company],
              isMentor&&["⏱","Experience", user.yearsExp],
            ].filter(Boolean).map(([icon,label,val])=> val ? (
              <div key={label} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 14px",backgroundColor:WH,borderRadius:12,border:`1px solid ${BD}`,marginBottom:8}}>
                <span style={{fontSize:18,width:24,textAlign:"center"}}>{icon}</span>
                <div>
                  <div style={{fontSize:11,color:GR,fontWeight:600}}>{label}</div>
                  <div style={{fontSize:13,color:BK,fontWeight:700}}>{val}</div>
                </div>
              </div>
            ):null)}
            {user.personalStory&&<div style={{padding:"14px 16px",backgroundColor:WH,borderRadius:14,border:`1px solid ${BD}`,marginTop:4}}>
              <div style={{fontSize:11,color:G,fontWeight:800,textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>Your story</div>
              <div style={{fontSize:13,color:GR,lineHeight:1.7}}>{user.personalStory}</div>
            </div>}
          </div>
        </div>}
      </div>{/* end body */}

      <nav style={{display:"flex",backgroundColor:WH,borderTop:`1px solid ${BD}`,padding:"6px 8px 14px",flexShrink:0}}>
        {NAV.map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setActiveChat(null);}} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px 0",cursor:"pointer",border:"none",background:"none",fontFamily:F,position:"relative"}}>
            <div style={{width:40,height:28,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:20,backgroundColor:tab===t.id?GL:"transparent",transition:"background .2s"}}>
              <span style={{fontSize:20}}>{t.icon}</span>
            </div>
            <span style={{fontSize:10,fontWeight:tab===t.id?900:600,color:tab===t.id?G:GR}}>{t.label}</span>
            {t.badge>0&&<div style={{position:"absolute",top:2,right:"calc(50% - 20px)",width:17,height:17,borderRadius:"50%",backgroundColor:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,color:WH}}>{t.badge}</div>}
            {tab===t.id&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:20,height:3,borderRadius:2,backgroundColor:G}}/>}
          </button>
        ))}
      </nav>

      {/* Modals */}
      {showTutorial&&<Tutorial onDone={()=>setShowTutorial(false)} role={user.role}/>}
      {showSettings&&<SettingsModal user={user} onClose={()=>setShowSettings(false)} onUpdate={setUser} onSignOut={onSignOut}/>}
      {showProfile&&<ProfilePage user={user} onClose={()=>setShowProfile(false)} onSave={u=>{setUser(u);setShowProfile(false);}}/>}
      {scheduling&&<ScheduleModal mentor={scheduling} existing={editSession} onClose={()=>{setScheduling(null);setEditSession(null);}} onConfirm={confirmSession} onCancel={()=>{setSessions(s=>s.filter(x=>x.id!==editSession?.id));setScheduling(null);setEditSession(null);}}/>}
      {showInvite&&<InviteModal invite={{name:"Ravi Patel",day:"Thursday, May 8",time:"2:00 PM EDT"}} onClose={()=>setShowInvite(false)} onAccept={()=>{setSessions(s=>[...s,{mentor:MENTORS[1],day:"Thursday, May 8",time:"2:00 PM EDT",id:Date.now()}]);setShowInvite(false);}} onDecline={()=>setShowInvite(false)} onReschedule={()=>{setShowInvite(false);setScheduling(MENTORS[1]);}}/>}
    </div>
  );
}

// ── Standalone Tutorial (from splash) ────────────────────
function StandaloneTutorial({ onDone }) {
  useFont();
  const [step, setStep] = useState(0);
  const STEPS = [
    { icon:"☕", title:"Welcome to Level Up", body:"Connect with mentors who know the Canadian landscape — and mentees who are ready to grow." },
    { icon:"🔍", title:"Find your match",     body:"Browse profiles. Read real stories. Request a coffee chat with someone whose path fits yours." },
    { icon:"📅", title:"Schedule sessions",   body:"Pick a day and time. Confirmed sessions go straight to your calendar." },
    { icon:"💬", title:"Chat & connect",      body:"Message before or after sessions. Build a real, lasting professional relationship." },
    { icon:"📊", title:"Track your journey",  body:"Your dashboard logs every session and hour — exportable for CPD and volunteer records." },
    { icon:"🌟", title:"Mentor or Mentee?",   body:"You can be both. Some of our best mentors are still being mentored themselves." },
  ];
  const S = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div style={{ minHeight:"100vh", backgroundColor:WH, fontFamily:F, display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto" }}>
      <div style={{ padding:"20px 24px 0", display:"flex", justifyContent:"flex-end" }}>
        <button onClick={onDone} style={{ background:"none", border:"none", color:GR, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:F }}>Skip</button>
      </div>

      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 32px 24px", textAlign:"center" }}>
        {/* Icon */}
        <div style={{ width:100, height:100, borderRadius:"50%", backgroundColor:GL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:44, marginBottom:28, border:`3px solid ${G}22` }}>
          {S.icon}
        </div>
        {/* Step indicator */}
        <div style={{ fontSize:11, color:G, letterSpacing:".2em", textTransform:"uppercase", fontWeight:700, marginBottom:10 }}>
          {step + 1} of {STEPS.length}
        </div>
        <div style={{ fontSize:26, fontWeight:900, color:BK, marginBottom:12, lineHeight:1.2 }}>{S.title}</div>
        <div style={{ fontSize:15, color:GR, lineHeight:1.8, maxWidth:300, fontWeight:500 }}>{S.body}</div>
      </div>

      {/* Progress dots */}
      <div style={{ display:"flex", justifyContent:"center", gap:7, marginBottom:28 }}>
        {STEPS.map((_,i) => (
          <div key={i} style={{ width:i===step?24:7, height:7, borderRadius:4, backgroundColor:i===step?G:BD, transition:"all .3s" }}/>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ padding:"0 28px 48px", display:"flex", gap:10 }}>
        {step > 0 && (
          <button onClick={() => setStep(s=>s-1)} style={{ flex:1, padding:"16px", backgroundColor:BG, border:`1px solid ${BD}`, borderRadius:50, fontSize:15, fontWeight:700, color:GR, cursor:"pointer", fontFamily:F }}>Back</button>
        )}
        <button onClick={() => isLast ? onDone() : setStep(s=>s+1)} style={{ flex:2, padding:"16px", backgroundColor:G, border:"none", borderRadius:50, fontSize:15, fontWeight:900, color:WH, cursor:"pointer", fontFamily:F, boxShadow:`0 4px 16px ${G}44` }}>
          {isLast ? "Get Started ☕" : "Next →"}
        </button>
      </div>
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────
export default function App() {
  const [screen,setScreen]=useState("splash");
  const [role,setRole]=useState(null);
  const [user,setUser]=useState(null);

  const handleRole = r => {
    if (r === "signin")   { setScreen("signin");   return; }
    if (r === "tutorial") { setScreen("tutorial"); return; }
    setRole(r); setScreen("signup");
  };

  return (
    <>
      {screen==="splash"   && <Splash onRole={handleRole}/>}
      {screen==="signin"   && <SignIn onBack={()=>setScreen("splash")} onSuccess={u=>{setUser(u);setScreen("home");}}/>}
      {screen==="signup"   && <SignUp role={role} onBack={()=>setScreen("splash")} onComplete={f=>{setUser(f);setScreen("home");}}/>}
      {screen==="tutorial" && <StandaloneTutorial onDone={()=>setScreen("splash")}/>}
      {screen==="home"     && user && <Home user={user} onSignOut={()=>{setUser(null);setScreen("splash");}}/>}
    </>
  );
}
