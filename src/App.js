import { useState, useEffect } from "react";

const B = {
  bg:"#1a2820", deep:"#111c17", card:"#1e2f28",
  green:"#8fe87a", greenDim:"#5db84a",
  text:"#e4f0e6", dim2:"#b0ccb4", muted:"#628a6c",
  border:"#2a3e32", borderLt:"#364f42",
  error:"#e87a7a", gold:"#f0c040", blue:"#4fa3e8",
};
const F = "'Nunito','Trebuchet MS',sans-serif";

// ─── setup ───────────────────────────────────────────────
function useSetup() {
  useEffect(() => {
    if (!document.getElementById("lu-font")) {
      const l = document.createElement("link");
      l.id = "lu-font"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap";
      document.head.appendChild(l);
    }
    if (!document.getElementById("lu-css")) {
      const s = document.createElement("style");
      s.id = "lu-css";
      s.textContent = `
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes steam{0%{opacity:0;transform:translateY(0) scale(1)}50%{opacity:.8}100%{opacity:0;transform:translateY(-14px) scale(.5)}}
        .a1{animation:fadeUp .6s ease both .05s}.a2{animation:fadeUp .6s ease both .2s}
        .a3{animation:fadeUp .6s ease both .35s}.a4{animation:fadeUp .6s ease both .5s}
        .a5{animation:fadeUp .6s ease both .65s}
        .fl{animation:float 3.5s ease-in-out infinite}
        .s1{animation:steam 2.2s ease-in-out infinite 0s}
        .s2{animation:steam 2.2s ease-in-out infinite .4s}
        .s3{animation:steam 2.2s ease-in-out infinite .8s}
      `;
      document.head.appendChild(s);
    }
  }, []);
}

// ─── shared components ────────────────────────────────────
function Cup({ size = 72 }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none" overflow="visible">
      <circle className="s1" cx="34" cy="16" r="4.5" fill={B.green} opacity=".55"/>
      <circle className="s2" cx="50" cy="9"  r="6"   fill={B.green}/>
      <circle className="s3" cx="66" cy="16" r="3.5" fill={B.green} opacity=".75"/>
      <path d="M15 52 Q15 80 50 80 Q85 80 85 52 L80 32 Q78 26 72 26 L28 26 Q22 26 20 32 Z"
        fill="none" stroke={B.green} strokeWidth="4.5" strokeLinejoin="round"/>
      <path d="M85 40 Q100 40 100 54 Q100 68 85 68"
        fill="none" stroke={B.green} strokeWidth="4.5" strokeLinecap="round"/>
    </svg>
  );
}

function Logo({ small }) {
  if (small) return (
    <div style={{display:"flex",alignItems:"center",gap:9}}>
      <div style={{width:32,height:32,backgroundColor:B.deep,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${B.border}`}}>
        <svg width="19" height="19" viewBox="0 0 100 100" fill="none">
          <circle cx="34" cy="16" r="3.5" fill={B.green} opacity=".5"/>
          <circle cx="50" cy="10" r="5"   fill={B.green}/>
          <circle cx="66" cy="16" r="3"   fill={B.green} opacity=".7"/>
          <path d="M14 50 Q14 74 50 74 Q86 74 86 50 L81 30 Q79 24 73 24 L27 24 Q21 24 19 30 Z" fill="none" stroke={B.green} strokeWidth="5.5" strokeLinejoin="round"/>
          <path d="M86 38 Q98 38 98 50 Q98 62 86 62" fill="none" stroke={B.green} strokeWidth="5.5" strokeLinecap="round"/>
        </svg>
      </div>
      <span style={{fontSize:17,fontWeight:800,color:B.green,fontFamily:F}}>Level Up</span>
    </div>
  );
  return null;
}

function ProgressBar({ step, total }) {
  return (
    <div style={{display:"flex",gap:5}}>
      {Array.from({length:total}).map((_,i)=>(
        <div key={i} style={{flex:1,height:2.5,borderRadius:4,backgroundColor:i<step?B.green:B.border,transition:"background-color .3s"}}/>
      ))}
    </div>
  );
}

function Field({ label, type="text", value, onChange, placeholder, hint }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{marginBottom:16}}>
      {label && <div style={{fontSize:10,color:B.muted,letterSpacing:".18em",textTransform:"uppercase",marginBottom:7,fontWeight:700}}>{label}</div>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{width:"100%",padding:"13px 16px",backgroundColor:B.deep,border:`1px solid ${focused?B.green:B.border}`,borderRadius:10,color:B.text,fontSize:14,outline:"none",fontFamily:F,boxSizing:"border-box",transition:"border-color .2s"}}/>
      {hint && <div style={{fontSize:11,color:B.muted,marginTop:5}}>{hint}</div>}
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{padding:"7px 13px",borderRadius:20,border:`1px solid ${active?B.green:B.border}`,backgroundColor:active?`${B.green}18`:B.card,color:active?B.green:B.muted,fontSize:12,cursor:"pointer",fontFamily:F,fontWeight:active?700:600,transition:"all .15s",whiteSpace:"nowrap",marginBottom:2}}>
      {active?"✓ ":""}{label}
    </button>
  );
}

function SectionLabel({ children, note }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
      <div style={{fontSize:10,color:B.muted,letterSpacing:".18em",textTransform:"uppercase",fontWeight:700}}>{children}</div>
      {note && <div style={{fontSize:10,color:B.muted,fontWeight:600}}>{note}</div>}
    </div>
  );
}

// ─── AI blurb ────────────────────────────────────────────
function BlurbField({ value, onChange, isMentor, firstName, profession, country, city }) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(null);
  const [focused, setFocused] = useState(false);

  const callAI = async (type) => {
    setLoading(true); setMode(type);
    const prompt = type === "write"
      ? `Write a short warm first-person profile intro (under 140 chars) for ${firstName||"someone"}, a ${profession||"professional"} from ${country||"abroad"} now in ${city||"Canada"}. They are ${isMentor?"a mentor helping newcomers":"a newcomer seeking career mentorship"}. Return only the text, no quotes.`
      : `Improve this profile intro to be more personal (under 140 chars). Return only the text, no quotes:\n\n${value}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,messages:[{role:"user",content:prompt}]})});
      const data = await res.json();
      const text = data.content?.[0]?.text?.trim()||"";
      if (text) onChange(text.slice(0,160));
    } catch(e){ console.error(e); }
    setLoading(false); setMode(null);
  };

  return (
    <div style={{marginBottom:22}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
        <div style={{fontSize:10,color:B.muted,letterSpacing:".18em",textTransform:"uppercase",fontWeight:700}}>Your intro · on your profile</div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>callAI("write")} disabled={loading} style={{padding:"4px 10px",borderRadius:20,backgroundColor:`${B.green}18`,border:`1px solid ${B.green}44`,color:B.green,fontSize:10,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:F}}>
            {loading&&mode==="write"?"Writing…":"✦ Write for me"}
          </button>
          {value.length>10&&<button onClick={()=>callAI("improve")} disabled={loading} style={{padding:"4px 10px",borderRadius:20,backgroundColor:B.card,border:`1px solid ${B.border}`,color:B.muted,fontSize:10,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:F}}>
            {loading&&mode==="improve"?"Improving…":"✦ Improve"}
          </button>}
        </div>
      </div>
      <div style={{backgroundColor:B.deep,border:`1px solid ${focused?B.green:B.border}`,borderRadius:12,overflow:"hidden",transition:"border-color .2s",position:"relative"}}>
        {loading&&<div style={{position:"absolute",inset:0,backgroundColor:`${B.deep}ee`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:B.green,fontWeight:700,zIndex:2}}>✦ AI is writing…</div>}
        <textarea value={value} onChange={e=>onChange(e.target.value.slice(0,160))}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          placeholder={isMentor?"e.g. Arrived from Nigeria in 2018 as an engineer. Took a year to land my first role. Now I help others get there faster.":"e.g. UX designer from Korea with 6 years experience. Looking for help breaking into the Canadian tech market."}
          rows={4} style={{width:"100%",padding:"14px 16px",backgroundColor:"transparent",border:"none",color:B.text,fontSize:13,outline:"none",fontFamily:F,boxSizing:"border-box",resize:"none",lineHeight:1.65}}/>
        <div style={{padding:"0 14px 10px",display:"flex",justifyContent:"space-between"}}>
          <div style={{fontSize:11,color:B.muted,fontStyle:"italic"}}>Your story is your strongest asset.</div>
          <div style={{fontSize:10,color:value.length>130?B.gold:B.muted}}>{value.length}/160</div>
        </div>
      </div>
    </div>
  );
}

// ─── LinkedIn ─────────────────────────────────────────────
function LinkedInConnect({ value, onChange }) {
  const [input, setInput] = useState(value||"");
  const [connected, setConnected] = useState(!!value);
  const connect = () => { onChange(input.trim()||"linked"); setConnected(true); };
  return (
    <div style={{marginBottom:18}}>
      <SectionLabel note="Optional">LinkedIn</SectionLabel>
      <div style={{backgroundColor:B.card,borderRadius:14,border:`1px solid ${connected?"#0a66c244":B.border}`,padding:"16px 18px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:connected?0:14}}>
          <div style={{width:40,height:40,borderRadius:10,backgroundColor:"#0a66c222",border:"1px solid #0a66c244",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a66c2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:connected?"#4fa3e8":B.text,marginBottom:2}}>{connected?"LinkedIn Connected":"Connect LinkedIn"}</div>
            <div style={{fontSize:11,color:B.muted}}>{connected?"Visible on your profile":"Builds trust with matches"}</div>
          </div>
          {connected&&<div style={{fontSize:18,color:"#4fa3e8"}}>✓</div>}
        </div>
        {!connected&&<>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="linkedin.com/in/yourname (optional)"
            style={{width:"100%",padding:"11px 14px",backgroundColor:B.deep,border:`1px solid ${B.border}`,borderRadius:10,color:B.text,fontSize:13,outline:"none",fontFamily:F,boxSizing:"border-box",marginBottom:10}}/>
          <button onClick={connect} style={{width:"100%",padding:"11px",backgroundColor:"#0a66c2",border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F}}>Connect LinkedIn</button>
        </>}
      </div>
    </div>
  );
}

// ─── Calendar ─────────────────────────────────────────────
function CalendarConnect({ value, onChange }) {
  const [chosen, setChosen] = useState(value||null);
  const CALS = [{id:"google",label:"Google Calendar",icon:"📅"},{id:"outlook",label:"Outlook",icon:"📆"},{id:"apple",label:"Apple Calendar",icon:"🗓"}];
  const pick = (id) => { const v = id===chosen?null:id; setChosen(v); onChange(v); };
  return (
    <div style={{marginBottom:18}}>
      <SectionLabel note="Optional">Calendar</SectionLabel>
      <div style={{backgroundColor:B.card,borderRadius:14,border:`1px solid ${chosen?B.green+"44":B.border}`,padding:"16px 18px"}}>
        <div style={{fontSize:13,color:B.dim2,marginBottom:14,lineHeight:1.6}}>Accepted coffee chats go straight to your calendar.</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {CALS.map(cal=>(
            <button key={cal.id} onClick={()=>pick(cal.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",backgroundColor:chosen===cal.id?`${B.green}14`:B.deep,border:`1px solid ${chosen===cal.id?B.green+"66":B.border}`,borderRadius:10,cursor:"pointer",fontFamily:F,transition:"all .15s"}}>
              <span style={{fontSize:20}}>{cal.icon}</span>
              <span style={{fontSize:13,color:chosen===cal.id?B.green:B.text,fontWeight:chosen===cal.id?700:600,flex:1,textAlign:"left"}}>{cal.label}</span>
              {chosen===cal.id&&<span style={{color:B.green,fontSize:12,fontWeight:800}}>✓ Connected</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── data ────────────────────────────────────────────────
const CITIES    = ["Toronto","Vancouver","Calgary","Montréal","Ottawa","Edmonton","Winnipeg","Halifax","Other"];
const COUNTRIES = ["India","Philippines","China","Nigeria","Syria","Ghana","Pakistan","Brazil","Ukraine","Colombia","Korea","Mexico","Ethiopia","Other"];
const YEARS     = Array.from({length:15},(_,i)=>String(new Date().getFullYear()-i));
const SECTORS   = ["Technology","Healthcare","Finance","Engineering","Education","Law","Marketing","Accounting","Trades","Other"];
const LANGUAGES = ["English","French","Tagalog","Mandarin","Hindi","Arabic","Spanish","Punjabi","Korean","Portuguese","Ukrainian","Urdu"];
const AREAS     = ["Resume & Job Search","Interview Prep","Credential Recognition","Canadian Workplace","Networking","LinkedIn","Salary Negotiation","Career Pivot"];
const IM_PATHS  = ["Express Entry","Provincial Nominee","Family Sponsorship","Student → PR","Refugee","Work Permit → PR","Other"];

const MENTORS = [
  {id:1,name:"Priya Sharma",emoji:"👩🏽‍💻",color:"#7b61ff",role:"Product Manager",company:"Shopify",city:"Toronto, ON",from:"🇮🇳 India",arrived:"2017",blurb:"Spent 8 months rejected for 'no Canadian experience.' Now a PM at Shopify. I'll show you exactly what changed.",tags:["Tech","Resume","LinkedIn"],speaks:["English","Hindi"],sessions:42},
  {id:2,name:"Jean-François T.",emoji:"👨🏾‍💼",color:"#f5c842",role:"Finance Director",company:"Desjardins",city:"Montréal, QC",from:"🇭🇦 Haiti",arrived:"2014",blurb:"Arrived with a finance degree no one recognized. Took 2 years to break through. Now I make it faster for others.",tags:["Finance","FR/EN","Quebec"],speaks:["French","English","Creole"],sessions:61},
  {id:3,name:"Amara Osei",emoji:"👩🏿‍⚕️",color:"#4fa3e8",role:"Nurse Manager",company:"VGH",city:"Vancouver, BC",from:"🇬🇭 Ghana",arrived:"2019",blurb:"IEN who navigated CRNBC in 6 months. I know every step and I'm here to walk you through it.",tags:["Healthcare","IEN","BC"],speaks:["English","Twi"],sessions:38},
  {id:4,name:"Mei-Lin Zhang",emoji:"👩🏻‍💻",color:B.green,role:"Software Engineer",company:"RBC",city:"Calgary, AB",from:"🇨🇳 China",arrived:"2020",blurb:"Cracked Canadian tech with no local experience. I'll teach you the exact playbook.",tags:["Tech","Interviews","Fintech"],speaks:["English","Mandarin"],sessions:29},
];

// ─── SPLASH ───────────────────────────────────────────────
function Splash({ onRole }) {
  useSetup();
  const [pressed, setPressed] = useState(null);
  const tap = r => { setPressed(r); setTimeout(()=>onRole(r),180); };
  return (
    <div style={{minHeight:"100vh",backgroundColor:B.bg,fontFamily:F,display:"flex",flexDirection:"column",alignItems:"center",maxWidth:480,margin:"0 auto",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"120%",height:"50%",background:`radial-gradient(ellipse at 50% 30%,${B.deep} 0%,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"12%",left:"50%",transform:"translateX(-50%)",width:240,height:240,background:`radial-gradient(ellipse at center,rgba(143,232,122,.1) 0%,transparent 65%)`,pointerEvents:"none"}}/>
      {[[{t:20,l:20},"borderTop","borderLeft"],[{t:20,r:20},"borderTop","borderRight"],[{b:20,l:20},"borderBottom","borderLeft"],[{b:20,r:20},"borderBottom","borderRight"]].map(([pos,a,c],i)=>(
        <div key={i} style={{position:"absolute",...pos,width:28,height:28,[a]:`1.5px solid ${B.borderLt}`,[c]:`1.5px solid ${B.borderLt}`,pointerEvents:"none"}}/>
      ))}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"64px 36px 28px",textAlign:"center"}}>
        <div className="fl a1" style={{marginBottom:28}}><Cup size={78}/></div>
        <div className="a2" style={{fontSize:54,fontWeight:800,color:B.green,letterSpacing:"-.5px",lineHeight:1,marginBottom:10}}>Level Up</div>
        <div className="a3" style={{fontSize:10,color:B.muted,letterSpacing:".22em",textTransform:"uppercase",marginBottom:32,fontWeight:600}}>Mentorship for Newcomers to Canada</div>
        <div className="a3" style={{width:36,height:1,background:`linear-gradient(to right,transparent,${B.borderLt},transparent)`,marginBottom:24}}/>
        <div className="a4" style={{fontSize:14,color:B.muted,lineHeight:1.9,maxWidth:240,fontWeight:400}}>
          Connect with mentors who've walked your path.<br/>Your journey starts here&nbsp;🍁
        </div>
      </div>
      <div className="a5" style={{width:"100%",padding:"0 24px 52px",boxSizing:"border-box"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
          <div style={{flex:1,height:1,backgroundColor:B.border}}/>
          <div style={{fontSize:9,color:B.muted,letterSpacing:".25em",textTransform:"uppercase",fontWeight:700}}>I am a</div>
          <div style={{flex:1,height:1,backgroundColor:B.border}}/>
        </div>
        <button onClick={()=>tap("mentee")} style={{width:"100%",padding:0,border:"none",borderRadius:18,cursor:"pointer",marginBottom:12,transform:pressed==="mentee"?"scale(.97)":"scale(1)",transition:"transform .15s",boxShadow:`0 6px 28px rgba(143,232,122,.22)`}}>
          <div style={{background:`linear-gradient(130deg,${B.green} 0%,${B.greenDim} 100%)`,padding:"22px 24px",borderRadius:18,textAlign:"left"}}>
            <div style={{fontSize:20,fontWeight:800,color:B.deep,fontFamily:F,marginBottom:4}}>Mentee</div>
            <div style={{fontSize:13,color:B.deep,opacity:.65,fontWeight:600}}>I'm new to Canada — guide me</div>
          </div>
        </button>
        <button onClick={()=>tap("mentor")} style={{width:"100%",padding:0,border:"none",borderRadius:18,cursor:"pointer",transform:pressed==="mentor"?"scale(.97)":"scale(1)",transition:"transform .15s"}}>
          <div style={{background:`linear-gradient(130deg,${B.card} 0%,${B.deep} 100%)`,border:`1.5px solid ${B.green}`,borderRadius:18,padding:"22px 24px",textAlign:"left"}}>
            <div style={{fontSize:20,fontWeight:800,color:B.green,fontFamily:F,marginBottom:4}}>Mentor</div>
            <div style={{fontSize:13,color:B.muted,fontWeight:600}}>I've been there — I'm ready to give back</div>
          </div>
        </button>
        <div style={{textAlign:"center",marginTop:22}}>
          <span style={{fontSize:13,color:B.muted,fontWeight:600}}>Already have an account? </span>
          <button onClick={()=>onRole("signin")} style={{background:"none",border:"none",color:B.green,fontSize:13,cursor:"pointer",fontFamily:F,fontWeight:800,padding:0,textDecoration:"underline",textUnderlineOffset:3}}>Sign in</button>
        </div>
      </div>
    </div>
  );
}

// ─── SIGN IN ──────────────────────────────────────────────
function SignIn({ onBack, onSuccess }) {
  useSetup();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = () => {
    if (!email.includes("@")) { setErr("Please enter a valid email."); return; }
    if (pw.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setErr(""); setLoading(true);
    setTimeout(()=>{ setLoading(false); onSuccess({email,firstName:email.split("@")[0],lastName:"",role:"mentee",blurb:"",city:"",country:"",profession:"",languages:[],linkedinUrl:"",calendarConnected:null}); },800);
  };
  return (
    <div style={{minHeight:"100vh",backgroundColor:B.bg,fontFamily:F,display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto"}}>
      <div style={{padding:"20px 24px 0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:B.muted,fontSize:14,cursor:"pointer",fontFamily:F,padding:0,fontWeight:600}}>← Back</button>
        <Logo small/><div style={{width:60}}/>
      </div>
      <div style={{flex:1,padding:"48px 28px 40px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={{fontSize:28,fontWeight:800,color:B.text,marginBottom:6}}>Welcome back</div>
        <div style={{fontSize:14,color:B.muted,marginBottom:32}}>Sign in to continue your journey</div>
        <Field label="Email" type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} placeholder="you@email.com"/>
        <Field label="Password" type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr("");}} placeholder="••••••••"/>
        <div style={{textAlign:"right",marginTop:-6,marginBottom:24}}>
          <button style={{background:"none",border:"none",color:B.muted,fontSize:12,cursor:"pointer",fontFamily:F,textDecoration:"underline",textUnderlineOffset:3,padding:0,fontWeight:600}}>Forgot password?</button>
        </div>
        {err&&<div style={{fontSize:12,color:B.error,marginBottom:16,padding:"10px 14px",backgroundColor:`${B.error}14`,borderRadius:8,border:`1px solid ${B.error}33`}}>{err}</div>}
        <button onClick={submit} disabled={loading} style={{width:"100%",padding:"15px",backgroundColor:loading?B.greenDim:B.green,border:"none",borderRadius:12,color:B.deep,fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:F,marginBottom:20}}>
          {loading?"Signing in…":"Sign In"}
        </button>
        <div style={{textAlign:"center"}}>
          <span style={{fontSize:13,color:B.muted,fontWeight:600}}>Don't have an account? </span>
          <button onClick={onBack} style={{background:"none",border:"none",color:B.green,fontSize:13,cursor:"pointer",fontFamily:F,fontWeight:800,padding:0,textDecoration:"underline",textUnderlineOffset:3}}>Create one</button>
        </div>
      </div>
      <div style={{padding:"0 28px 36px",textAlign:"center"}}>
        <div style={{fontSize:11,color:B.muted,lineHeight:1.7,opacity:.7}}>🔒 PIPEDA compliant · Your data stays in Canada.</div>
      </div>
    </div>
  );
}

// ─── SIGN UP ──────────────────────────────────────────────
function SignUp({ initialRole, onBack, onComplete }) {
  useSetup();
  const [step, setStep] = useState(1);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    firstName:"",lastName:"",email:"",password:"",
    role:initialRole||"",
    city:"",country:"",arrivalYear:"",
    profession:"",sectors:[],languages:[],blurb:"",
    mentorAreas:[],immigrationPath:"",
    linkedinUrl:"",calendarConnected:null,
  });
  const set = (k,v) => { setForm(f=>({...f,[k]:v})); setErr(""); };
  const tog = (k,v) => set(k, form[k].includes(v) ? form[k].filter(x=>x!==v) : [...form[k],v]);
  const isMentor = form.role==="mentor";
  const total = isMentor ? 4 : 3;

  const validate = () => {
    if (step===1) {
      if (!form.firstName.trim()||!form.lastName.trim()) return "Please enter your full name.";
      if (!form.email.includes("@")) return "Please enter a valid email.";
      if (form.password.length<6) return "Password must be at least 6 characters.";
    }
    if (step===2 && !form.role) return "Please choose how you'd like to join.";
    if (step===3) {
      if (!form.city) return "Please select your city.";
      if (!form.profession.trim()) return "Please enter your professional background.";
      if (!form.blurb.trim()) return "Please write a short intro.";
    }
    return null;
  };

  const next = () => {
    const e = validate(); if (e) { setErr(e); return; }
    if (step<total) { setStep(s=>s+1); setErr(""); }
    else onComplete(form);
  };

  return (
    <div style={{minHeight:"100vh",backgroundColor:B.bg,fontFamily:F,color:B.text,display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto"}}>
      <div style={{padding:"18px 22px 14px",backgroundColor:B.deep,borderBottom:`1px solid ${B.border}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <button onClick={step===1?onBack:()=>{setStep(s=>s-1);setErr("");}} style={{background:"none",border:"none",color:B.muted,fontSize:14,cursor:"pointer",fontFamily:F,padding:0,fontWeight:600}}>← Back</button>
          <Logo small/>
          <div style={{fontSize:11,color:B.muted,fontWeight:600}}>{step} / {total}</div>
        </div>
        <ProgressBar step={step} total={total}/>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"26px 22px 120px"}}>

        {/* STEP 1 */}
        {step===1&&<>
          <div style={{marginBottom:28}}>
            <div style={{fontSize:26,fontWeight:800,color:B.text,marginBottom:5}}>Create your account</div>
            <div style={{fontSize:14,color:B.muted}}>Start with your basic details.</div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1}}><Field label="First Name" value={form.firstName} onChange={e=>set("firstName",e.target.value)} placeholder="First"/></div>
            <div style={{flex:1}}><Field label="Last Name" value={form.lastName} onChange={e=>set("lastName",e.target.value)} placeholder="Last"/></div>
          </div>
          <Field label="Email" type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="you@email.com"/>
          <Field label="Password" type="password" value={form.password} onChange={e=>set("password",e.target.value)} placeholder="Min. 6 characters"/>
        </>}

        {/* STEP 2 */}
        {step===2&&<>
          <div style={{marginBottom:28}}>
            <div style={{fontSize:26,fontWeight:800,color:B.text,marginBottom:5}}>How are you joining?</div>
            <div style={{fontSize:14,color:B.muted}}>Choose your role — you can switch later.</div>
          </div>
          {[{val:"mentee",title:"Mentee",sub:"I'm new to Canada",desc:"Looking for someone who's been in your shoes and can guide you through building a career in Canada."},{val:"mentor",title:"Mentor",sub:"I'm ready to give back",desc:"You've navigated Canada as a newcomer and want to help others do the same."}].map(r=>{
            const active = form.role===r.val;
            return (
              <div key={r.val} onClick={()=>set("role",r.val)} style={{marginBottom:14,padding:"20px 18px",borderRadius:16,border:`1.5px solid ${active?B.green:B.border}`,background:active?`linear-gradient(135deg,${B.green}10 0%,${B.card} 100%)`:B.card,cursor:"pointer",transition:"all .2s",position:"relative"}}>
                {active&&<div style={{position:"absolute",top:14,right:14,width:22,height:22,borderRadius:"50%",backgroundColor:B.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:B.deep,fontWeight:800}}>✓</div>}
                <div style={{fontSize:17,fontWeight:800,color:active?B.green:B.text,marginBottom:4}}>{r.title}</div>
                <div style={{fontSize:12,color:B.muted,fontWeight:600,marginBottom:8}}>{r.sub}</div>
                <div style={{fontSize:13,color:active?B.dim2:B.muted,lineHeight:1.65}}>{r.desc}</div>
              </div>
            );
          })}
        </>}

        {/* STEP 3 */}
        {step===3&&<>
          <div style={{marginBottom:24}}>
            <div style={{fontSize:26,fontWeight:800,color:B.text,marginBottom:5}}>Your profile</div>
            <div style={{fontSize:14,color:B.muted}}>This is what {isMentor?"mentees":"mentors"} see when they find you.</div>
          </div>

          {/* Photo */}
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20,padding:"14px 16px",backgroundColor:B.card,borderRadius:14,border:`1px solid ${B.border}`}}>
            <div style={{width:52,height:52,borderRadius:"50%",backgroundColor:B.deep,border:`2px dashed ${B.muted}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>👤</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,color:B.text,fontWeight:700,marginBottom:2}}>Add a photo</div>
              <div style={{fontSize:11,color:B.muted}}>Profiles with photos get 3× more connections</div>
            </div>
            <button style={{padding:"7px 13px",backgroundColor:"transparent",border:`1px solid ${B.border}`,borderRadius:20,color:B.muted,fontSize:11,cursor:"pointer",fontFamily:F,fontWeight:600}}>Upload</button>
          </div>

          {/* Blurb */}
          <BlurbField value={form.blurb} onChange={v=>set("blurb",v)} isMentor={isMentor}
            firstName={form.firstName} profession={form.profession} country={form.country} city={form.city}/>

          {/* City */}
          <div style={{marginBottom:16}}>
            <SectionLabel>City in Canada</SectionLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{CITIES.map(c=><Chip key={c} label={c} active={form.city===c} onClick={()=>set("city",c)}/>)}</div>
          </div>

          {/* Country — optional both */}
          <div style={{marginBottom:16}}>
            <SectionLabel note="Optional">Country of Origin</SectionLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{COUNTRIES.map(c=><Chip key={c} label={c} active={form.country===c} onClick={()=>set("country",form.country===c?"":c)}/>)}</div>
          </div>

          {/* Arrival year — mentees only */}
          {!isMentor&&<div style={{marginBottom:16}}>
            <SectionLabel>Year Arrived in Canada</SectionLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{YEARS.slice(0,10).map(y=><Chip key={y} label={y} active={form.arrivalYear===y} onClick={()=>set("arrivalYear",y)}/>)}</div>
          </div>}

          {/* Profession */}
          <Field label={isMentor?"Current Job Title":"Professional Background"} value={form.profession}
            onChange={e=>set("profession",e.target.value)}
            placeholder={isMentor?"e.g. Senior Product Manager":"e.g. Civil Engineer, 6 years experience"}/>

          {/* Sector */}
          <div style={{marginBottom:16}}>
            <SectionLabel>Sector</SectionLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{SECTORS.map(s=><Chip key={s} label={s} active={(form.sectors||[]).includes(s)} onClick={()=>tog("sectors",s)}/>)}</div>
          </div>

          {/* Languages — both roles */}
          <div style={{marginBottom:16}}>
            <SectionLabel note="Select all that apply">Languages I speak</SectionLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{LANGUAGES.map(l=><Chip key={l} label={l} active={(form.languages||[]).includes(l)} onClick={()=>tog("languages",l)}/>)}</div>
          </div>

          <LinkedInConnect value={form.linkedinUrl} onChange={v=>set("linkedinUrl",v)}/>
          <CalendarConnect value={form.calendarConnected} onChange={v=>set("calendarConnected",v)}/>
        </>}

        {/* STEP 4 — mentor only */}
        {step===4&&isMentor&&<>
          <div style={{marginBottom:24}}>
            <div style={{fontSize:26,fontWeight:800,color:B.text,marginBottom:5}}>How you'll help</div>
            <div style={{fontSize:14,color:B.muted}}>Helps mentees find you for the right reasons.</div>
          </div>

          <div style={{marginBottom:16}}>
            <SectionLabel>I can help with</SectionLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{AREAS.map(a=><Chip key={a} label={a} active={form.mentorAreas.includes(a)} onClick={()=>tog("mentorAreas",a)}/>)}</div>
          </div>

          <div style={{marginBottom:20}}>
            <SectionLabel>How you came to Canada</SectionLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{IM_PATHS.map(p=><Chip key={p} label={p} active={form.immigrationPath===p} onClick={()=>set("immigrationPath",p)}/>)}</div>
          </div>

          {/* Preview */}
          <div style={{padding:"18px",backgroundColor:B.card,borderRadius:16,border:`1px solid ${B.border}`}}>
            <div style={{fontSize:9,color:B.green,letterSpacing:".2em",textTransform:"uppercase",marginBottom:14,fontWeight:700}}>Preview — how mentees see you</div>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
              <div style={{width:44,height:44,borderRadius:"50%",backgroundColor:B.deep,border:`2px solid ${B.borderLt}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🌟</div>
              <div>
                <div style={{fontSize:14,fontWeight:800,color:B.text}}>{form.firstName||"Your"} {form.lastName||"Name"}</div>
                <div style={{fontSize:11,color:B.green,fontWeight:600}}>{form.profession||"Your role"}</div>
                <div style={{fontSize:11,color:B.muted}}>{form.city||"City"}{form.country?` · ${form.country}`:""}</div>
              </div>
            </div>
            <div style={{fontSize:12,color:form.blurb?B.muted:B.border,lineHeight:1.65,fontStyle:"italic",marginBottom:10}}>
              {form.blurb?`"${form.blurb}"`:'"Your intro will appear here..."'}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {form.mentorAreas.slice(0,3).map(a=>(
                <span key={a} style={{fontSize:10,padding:"3px 8px",borderRadius:20,backgroundColor:`${B.green}18`,color:B.green,border:`1px solid ${B.green}33`}}>{a}</span>
              ))}
            </div>
          </div>
        </>}

        {err&&<div style={{fontSize:12,color:B.error,marginTop:16,padding:"10px 14px",backgroundColor:`${B.error}14`,borderRadius:8,border:`1px solid ${B.error}33`}}>{err}</div>}
      </div>

      <div style={{padding:"14px 22px 36px",backgroundColor:B.deep,borderTop:`1px solid ${B.border}`}}>
        <button onClick={next} style={{width:"100%",padding:"15px",backgroundColor:B.green,border:"none",borderRadius:12,color:B.deep,fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:F,boxShadow:`0 4px 24px rgba(143,232,122,.28)`}}>
          {step===total?(isMentor?"Create My Mentor Profile":"Find My Mentors →"):"Continue →"}
        </button>
      </div>
    </div>
  );
}

// ─── SCHEDULE MODAL ───────────────────────────────────────
function ScheduleModal({ mentor, onClose, onConfirm }) {
  const today = new Date();
  const TIMES = ["9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
  const DAYS = Array.from({length:7},(_,i)=>{const d=new Date(today);d.setDate(today.getDate()+i+1);return{label:d.toLocaleDateString("en-CA",{weekday:"short",month:"short",day:"numeric"}),date:d};});
  const [selDay, setSelDay] = useState(null);
  const [selTime, setSelTime] = useState(null);
  return (
    <div style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,.75)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={onClose}>
      <div style={{backgroundColor:B.card,borderRadius:"22px 22px 0 0",padding:"24px 22px 36px",width:"100%",maxWidth:480,margin:"0 auto",border:`1px solid ${B.border}`}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div>
            <div style={{fontSize:17,fontWeight:800,color:B.text}}>Schedule a Coffee Chat</div>
            <div style={{fontSize:12,color:B.muted,marginTop:2}}>with {mentor.name}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:B.muted,fontSize:24,cursor:"pointer",lineHeight:1}}>×</button>
        </div>
        <SectionLabel>Choose a day</SectionLabel>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:12,marginBottom:16}}>
          {DAYS.map((d,i)=>(
            <button key={i} onClick={()=>setSelDay(i)} style={{flexShrink:0,padding:"10px 14px",borderRadius:12,border:`1px solid ${selDay===i?B.green:B.border}`,backgroundColor:selDay===i?`${B.green}18`:B.deep,color:selDay===i?B.green:B.muted,fontSize:11,fontWeight:selDay===i?800:600,cursor:"pointer",fontFamily:F,textAlign:"center",minWidth:70}}>
              {d.label.split(",")[0]}<br/><span style={{fontSize:13,fontWeight:800}}>{d.label.split(" ").pop()}</span>
            </button>
          ))}
        </div>
        <SectionLabel>Choose a time (EDT)</SectionLabel>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:22}}>
          {TIMES.map(t=>(
            <button key={t} onClick={()=>setSelTime(t)} style={{padding:"9px 14px",borderRadius:10,border:`1px solid ${selTime===t?B.green:B.border}`,backgroundColor:selTime===t?`${B.green}18`:B.deep,color:selTime===t?B.green:B.muted,fontSize:12,fontWeight:selTime===t?800:600,cursor:"pointer",fontFamily:F}}>
              {t}
            </button>
          ))}
        </div>
        <button onClick={()=>selDay!==null&&selTime&&onConfirm({mentor,day:DAYS[selDay].label,time:selTime})} disabled={selDay===null||!selTime}
          style={{width:"100%",padding:"14px",backgroundColor:selDay!==null&&selTime?B.green:B.border,border:"none",borderRadius:12,color:selDay!==null&&selTime?B.deep:B.muted,fontSize:14,fontWeight:800,cursor:selDay!==null&&selTime?"pointer":"not-allowed",fontFamily:F,transition:"all .2s"}}>
          {selDay!==null&&selTime?`☕ Confirm — ${DAYS[selDay].label} at ${selTime}`:"Select a day and time"}
        </button>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────
function Home({ user, onSignOut }) {
  useSetup();
  const isMentor = user.role==="mentor";
  const [tab, setTab] = useState("home");
  const [expanded, setExpanded] = useState(null);
  const [scheduling, setScheduling] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [requested, setRequested] = useState({});
  const currentMonth = new Date().getMonth();
  const BAR_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const confirmSession = ({mentor,day,time}) => {
    setSessions(s=>[...s,{mentor,day,time,id:Date.now()}]);
    setRequested(r=>({...r,[mentor.id]:true}));
    setScheduling(null);
  };

  return (
    <div style={{height:"100vh",backgroundColor:B.bg,fontFamily:F,color:B.text,display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto"}}>
      <div style={{padding:"14px 22px",backgroundColor:B.deep,borderBottom:`1px solid ${B.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <Logo small/>
        <button onClick={onSignOut} style={{background:"none",border:`1px solid ${B.border}`,borderRadius:20,padding:"5px 14px",color:B.muted,fontSize:11,cursor:"pointer",fontFamily:F,fontWeight:600}}>Sign out</button>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 20px 100px"}}>

        {/* HOME TAB */}
        {tab==="home"&&<>
          <div style={{padding:"20px",marginBottom:18,background:`linear-gradient(145deg,#1a3025 0%,${B.deep} 100%)`,borderRadius:18,border:`1px solid ${B.border}`,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-16,right:-10,fontSize:80,opacity:.05}}>🍁</div>
            <div style={{fontSize:12,color:B.green,marginBottom:8,fontWeight:700}}>👋 Welcome, {user.firstName}</div>
            <div style={{fontSize:20,fontWeight:800,lineHeight:1.35,marginBottom:10}}>{isMentor?"Your mentor profile is live.":"Let's find your mentor."}</div>
            <div style={{fontSize:13,color:B.muted,lineHeight:1.75,marginBottom:16}}>{isMentor?"Mentees in your city are looking for someone with your experience.":"Browse mentors who've walked your exact path in Canada."}</div>
            <button onClick={()=>setTab(isMentor?"dashboard":"mentors")} style={{backgroundColor:B.green,color:B.deep,border:"none",borderRadius:22,padding:"10px 20px",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:F}}>
              ☕ {isMentor?"See Dashboard":"Find a Mentor"}
            </button>
          </div>

          <SectionLabel>Your Profile</SectionLabel>
          <div style={{backgroundColor:B.card,borderRadius:16,border:`1px solid ${B.border}`,padding:"16px",marginBottom:22}}>
            <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:user.blurb?12:0}}>
              <div style={{width:50,height:50,borderRadius:"50%",backgroundColor:B.deep,border:`2px solid ${B.borderLt}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{isMentor?"🌟":"🎯"}</div>
              <div>
                <div style={{fontSize:15,fontWeight:800,color:B.text}}>{user.firstName} {user.lastName}</div>
                <div style={{fontSize:11,color:B.green,fontWeight:600,marginBottom:2}}>{user.profession||(isMentor?"Mentor":"Mentee")}</div>
                <div style={{fontSize:11,color:B.muted}}>
                  {user.country?`${user.country} → 🇨🇦`:""}{user.city?` · 📍 ${user.city}`:""}
                  {user.languages?.length?` · 💬 ${user.languages.slice(0,2).join(", ")}`:""}
                </div>
              </div>
            </div>
            {user.blurb&&<div style={{fontSize:12,color:B.muted,lineHeight:1.65,fontStyle:"italic",padding:"10px 12px",backgroundColor:B.deep,borderRadius:10,border:`1px solid ${B.border}`}}>"{user.blurb}"</div>}
          </div>

          <SectionLabel>Upcoming Sessions</SectionLabel>
          {sessions.length===0?(
            <div style={{backgroundColor:B.card,borderRadius:14,border:`1px dashed ${B.border}`,padding:"22px",textAlign:"center"}}>
              <div style={{fontSize:13,color:B.muted,marginBottom:12}}>No sessions yet. Connect with a {isMentor?"mentee":"mentor"} to get started.</div>
              <button onClick={()=>setTab(isMentor?"dashboard":"mentors")} style={{padding:"8px 18px",backgroundColor:`${B.green}18`,border:`1px solid ${B.green}44`,borderRadius:20,color:B.green,fontSize:12,cursor:"pointer",fontFamily:F,fontWeight:700}}>
                Browse {isMentor?"Mentees":"Mentors"} →
              </button>
            </div>
          ):sessions.map(s=>(
            <div key={s.id} style={{backgroundColor:B.card,borderRadius:14,border:`1px solid ${B.border}`,padding:"14px 16px",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,borderRadius:"50%",backgroundColor:"#7b61ff22",border:"2px solid #7b61ff44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{s.mentor.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:800,color:B.text}}>☕ {s.mentor.name}</div>
                  <div style={{fontSize:11,color:B.green,marginTop:2}}>📅 {s.day} · {s.time}</div>
                </div>
                <div style={{width:8,height:8,borderRadius:"50%",backgroundColor:B.green,boxShadow:`0 0 6px ${B.green}`}}/>
              </div>
            </div>
          ))}
        </>}

        {/* MENTORS TAB */}
        {tab==="mentors"&&!isMentor&&<>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{fontSize:18,fontWeight:800,color:B.text}}>Mentors</div>
            <div style={{fontSize:11,color:B.green,fontWeight:700}}>{MENTORS.length} available</div>
          </div>
          {MENTORS.map(m=>{
            const isExp = expanded===m.id;
            const isReq = requested[m.id];
            return (
              <div key={m.id} style={{backgroundColor:B.card,borderRadius:16,border:`1px solid ${isExp?m.color+"55":B.border}`,marginBottom:12,overflow:"hidden",transition:"border-color .2s"}}>
                <div onClick={()=>setExpanded(isExp?null:m.id)} style={{padding:"16px 18px",cursor:"pointer",display:"flex",gap:14,alignItems:"center"}}>
                  <div style={{width:50,height:50,borderRadius:"50%",backgroundColor:m.color+"22",border:`2px solid ${m.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{m.emoji}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:15,fontWeight:800,color:B.text}}>{m.name}</div>
                    <div style={{fontSize:11,color:m.color,fontWeight:600}}>{m.role} @ {m.company}</div>
                    <div style={{fontSize:11,color:B.muted}}>📍 {m.city}</div>
                  </div>
                  <div style={{fontSize:14,color:B.muted,transform:isExp?"rotate(180deg)":"rotate(0)",transition:"transform .2s"}}>▾</div>
                </div>
                {isExp&&<div style={{padding:"0 18px 18px",borderTop:`1px solid ${B.border}`,paddingTop:14}}>
                  <div style={{fontSize:13,color:B.dim2,lineHeight:1.75,fontStyle:"italic",marginBottom:14,padding:"12px 14px",backgroundColor:B.deep,borderRadius:10,border:`1px solid ${B.border}`}}>"{m.blurb}"</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                    {m.tags.map(t=><span key={t} style={{fontSize:10,padding:"3px 9px",borderRadius:20,backgroundColor:`${B.green}18`,color:B.green,border:`1px solid ${B.green}33`,fontWeight:700}}>{t}</span>)}
                    {m.speaks.map(l=><span key={l} style={{fontSize:10,padding:"3px 9px",borderRadius:20,backgroundColor:B.deep,color:B.muted,border:`1px solid ${B.border}`}}>💬 {l}</span>)}
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:14}}>
                    {[[m.sessions,"Sessions"],["⭐ 4.9","Rating"],["Since "+m.arrived,"In Canada"]].map(([v,l])=>(
                      <div key={l} style={{flex:1,textAlign:"center",padding:"10px 6px",backgroundColor:B.deep,borderRadius:10,border:`1px solid ${B.border}`}}>
                        <div style={{fontSize:13,fontWeight:800,color:B.text}}>{v}</div>
                        <div style={{fontSize:9,color:B.muted,marginTop:2}}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={()=>isReq?null:setScheduling(m)} style={{width:"100%",padding:"13px",backgroundColor:isReq?B.deep:B.green,border:`1.5px solid ${isReq?B.border:"transparent"}`,borderRadius:12,color:isReq?B.muted:B.deep,fontSize:14,fontWeight:800,cursor:isReq?"default":"pointer",fontFamily:F,boxShadow:isReq?"none":`0 4px 18px rgba(143,232,122,.28)`,transition:"all .2s"}}>
                    {isReq?"✓ Session Scheduled":"☕ Request a Coffee Chat"}
                  </button>
                </div>}
              </div>
            );
          })}
        </>}

        {/* DASHBOARD TAB */}
        {tab==="dashboard"&&<>
          <div style={{fontSize:18,fontWeight:800,color:B.text,marginBottom:20}}>Your Dashboard</div>
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            {[[sessions.length,"Sessions","☕"],[sessions.length+"h","Hours logged","⏱"],[isMentor?"0":sessions.length,isMentor?"Mentees helped":"Mentors met","🤝"]].map(([v,l,icon])=>(
              <div key={l} style={{flex:1,backgroundColor:B.card,border:`1px solid ${B.border}`,borderRadius:14,padding:"16px 10px",textAlign:"center"}}>
                <div style={{fontSize:18,marginBottom:4}}>{icon}</div>
                <div style={{fontSize:22,fontWeight:800,color:B.green}}>{v}</div>
                <div style={{fontSize:10,color:B.muted,marginTop:3,lineHeight:1.3}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{backgroundColor:B.card,borderRadius:16,border:`1px solid ${B.border}`,padding:"18px",marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:800,color:B.text}}>Hours this year</div>
              <button style={{fontSize:11,padding:"5px 12px",backgroundColor:`${B.green}18`,border:`1px solid ${B.green}44`,borderRadius:20,color:B.green,cursor:"pointer",fontFamily:F,fontWeight:700}}>Export PDF</button>
            </div>
            <div style={{display:"flex",gap:4,alignItems:"flex-end",height:60,marginBottom:8}}>
              {BAR_MONTHS.map((m,i)=>{
                const h = i===currentMonth?sessions.length:0;
                const maxH = Math.max(sessions.length,1);
                return <div key={m} style={{flex:1,borderRadius:4,backgroundColor:h>0?B.green:B.border,height:h>0?`${(h/maxH)*52}px`:"4px",minHeight:4,transition:"height .5s ease"}}/>;
              })}
            </div>
            <div style={{display:"flex",gap:4}}>
              {BAR_MONTHS.map((m,i)=><div key={m} style={{flex:1,fontSize:8,color:i===currentMonth?B.green:B.muted,textAlign:"center",fontWeight:i===currentMonth?800:400}}>{m}</div>)}
            </div>
            <div style={{fontSize:11,color:B.muted,marginTop:12,textAlign:"center"}}>{sessions.length}h logged · Exportable for CPD / volunteer records</div>
          </div>
          {user.linkedinUrl&&<div style={{backgroundColor:B.card,borderRadius:14,border:"1px solid #0a66c244",padding:"14px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:9,backgroundColor:"#0a66c222",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:"#4fa3e8"}}>LinkedIn Connected</div>
              <div style={{fontSize:11,color:B.muted}}>Your mentor role is visible on your profile</div>
            </div>
            <span style={{color:"#4fa3e8",fontSize:16}}>✓</span>
          </div>}
          {user.calendarConnected&&<div style={{backgroundColor:B.card,borderRadius:14,border:`1px solid ${B.green}33`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:22}}>📅</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:B.green}}>Calendar Connected</div>
              <div style={{fontSize:11,color:B.muted}}>Sessions automatically added when accepted</div>
            </div>
            <span style={{color:B.green,fontSize:16}}>✓</span>
          </div>}
        </>}
      </div>

      <nav style={{display:"flex",backgroundColor:B.deep,borderTop:`1px solid ${B.border}`,padding:"8px 0 12px",flexShrink:0}}>
        {[{id:"home",icon:"🏠",label:"Home"},{id:isMentor?"dashboard":"mentors",icon:isMentor?"📊":"🔍",label:isMentor?"Dashboard":"Mentors"},{id:"messages",icon:"💬",label:"Messages"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 0",cursor:"pointer",color:tab===t.id?B.green:B.muted,fontSize:10,fontWeight:tab===t.id?800:600,border:"none",background:"none",fontFamily:F}}>
            <span style={{fontSize:20}}>{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>

      {scheduling&&<ScheduleModal mentor={scheduling} onClose={()=>setScheduling(null)} onConfirm={confirmSession}/>}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [role,   setRole]   = useState(null);
  const [user,   setUser]   = useState(null);

  const handleRole = r => {
    if (r==="signin") { setScreen("signin"); return; }
    setRole(r); setScreen("signup");
  };

  return (
    <>
      {screen==="splash" && <Splash onRole={handleRole}/>}
      {screen==="signin" && <SignIn onBack={()=>setScreen("splash")} onSuccess={u=>{setUser(u);setScreen("home");}}/>}
      {screen==="signup" && <SignUp initialRole={role} onBack={()=>setScreen("splash")} onComplete={f=>{setUser(f);setScreen("home");}}/>}
      {screen==="home"   && user && <Home user={user} onSignOut={()=>{setUser(null);setScreen("splash");}}/>}
    </>
  );
}
