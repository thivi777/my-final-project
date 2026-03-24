import { Smile, Meh, Frown, Bell, CheckCircle2, Circle } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Progress } from "@/components/ui/progress";
import ScrollReveal from "@/components/ScrollReveal";

const moodData = [
  {day:"Mon",mood:7},{day:"Tue",mood:5},{day:"Wed",mood:8},
  {day:"Thu",mood:6},{day:"Fri",mood:9},{day:"Sat",mood:7},{day:"Sun",mood:8},
];
const tasks = [
  {label:"Morning breathing exercise",done:true},
  {label:"Write 3 gratitude items",done:true},
  {label:"5-min guided meditation",done:false},
  {label:"Evening mood check-in",done:false},
];

const DashboardPreview = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Jost:wght@300;400;500&display=swap');
      .ds{padding:7rem 0;background:#faf9f6;position:relative;overflow:hidden;}
      .ds::before{content:'';position:absolute;top:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(10,140,122,0.25),transparent);}
      .dsb1{position:absolute;top:-8rem;left:-6rem;width:36vw;height:36vw;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(10,140,122,0.1) 0%,transparent 70%);}
      .dsb2{position:absolute;bottom:-4rem;right:-6rem;width:28vw;height:28vw;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%);}
      .dsw{max-width:1280px;margin:0 auto;padding:0 clamp(2rem,6vw,7rem);position:relative;z-index:1;}
      .dsh{text-align:center;margin-bottom:5rem;}
      .dsl{display:inline-flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;}
      .dsll{width:24px;height:1px;background:#c9a84c;}
      .dslt{font-family:'Jost',sans-serif;font-size:.6rem;font-weight:400;letter-spacing:.28em;text-transform:uppercase;color:#0a8c7a;}
      .dsh2{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,4vw,3.6rem);font-weight:400;color:#042d26;line-height:1.1;letter-spacing:-.01em;margin:0 0 1rem;}
      .dsh2 em{font-style:italic;color:#065a4e;}
      .dssub{font-family:'Cormorant Garamond',serif;font-size:1.12rem;font-weight:300;color:#2a4a44;max-width:500px;margin:0 auto;line-height:1.75;}
      .dsgrid{display:grid;grid-template-columns:1fr 1fr;gap:0;background:rgba(10,140,122,0.1);border:1px solid rgba(10,140,122,0.15);}
      .dsc{background:#faf9f6;padding:2.25rem;border-right:1px solid rgba(10,140,122,0.12);border-bottom:1px solid rgba(10,140,122,0.12);}
      .dsc:nth-child(even){border-right:none;}
      .dsc:nth-last-child(-n+2){border-bottom:none;}
      .dscl{font-family:'Jost',sans-serif;font-size:.58rem;font-weight:400;letter-spacing:.25em;text-transform:uppercase;color:#0a8c7a;margin-bottom:.4rem;}
      .dsct{font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:400;color:#042d26;margin-bottom:1.6rem;line-height:1.2;}
      .dsmoods{display:flex;gap:1.5px;background:rgba(10,140,122,0.1);}
      .dsmb{flex:1;display:flex;flex-direction:column;align-items:center;gap:.55rem;padding:1.1rem .75rem;background:#faf9f6;border:none;cursor:pointer;transition:background .3s;text-align:center;}
      .dsmb:hover{background:#e0f4f1;}
      .dsmb.on{background:#065a4e;}
      .dsmb.on .dsmi{color:#b8e0d8;}
      .dsmb.on .dsml{color:rgba(224,244,241,.65);}
      .dsmi{color:#0a8c7a;transition:color .3s;}
      .dsml{font-family:'Jost',sans-serif;font-size:.58rem;font-weight:400;letter-spacing:.14em;text-transform:uppercase;color:#2a4a44;transition:color .3s;}
      .dsiq{display:flex;gap:1.25rem;align-items:flex-start;}
      .dsii{width:40px;height:40px;flex-shrink:0;border:1px solid rgba(10,140,122,0.2);display:flex;align-items:center;justify-content:center;color:#0a8c7a;margin-top:.25rem;}
      .dsiqt{font-family:'Cormorant Garamond',serif;font-size:1.08rem;font-weight:400;font-style:italic;color:#065a4e;line-height:1.75;border-left:2px solid #c9a84c;padding-left:1.1rem;}
      .dspb{width:100%;height:2px;background:rgba(10,140,122,0.12);margin-bottom:1.6rem;position:relative;}
      .dspf{height:100%;width:50%;background:linear-gradient(90deg,#065a4e,#0a8c7a);}
      .dspp{position:absolute;right:0;top:-1.4rem;font-family:'Jost',sans-serif;font-size:.62rem;font-weight:500;letter-spacing:.12em;color:#0a8c7a;}
      .dstasks{display:flex;flex-direction:column;gap:.6rem;}
      .dstask{display:flex;align-items:center;gap:.7rem;padding:.55rem 0;border-bottom:1px solid rgba(10,140,122,0.08);}
      .dstask:last-child{border-bottom:none;}
      .dstxt{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:400;color:#042d26;}
      .dstxt.done{color:#0a8c7a;text-decoration:line-through;text-decoration-color:rgba(10,140,122,0.4);}
      .dschart{height:175px;width:100%;}
      @media(max-width:900px){.dsgrid{grid-template-columns:1fr;}.ds{padding:4rem 0;}.dsc:nth-child(even){border-right:1px solid rgba(10,140,122,0.12);}.dsc:nth-last-child(-n+2){border-bottom:1px solid rgba(10,140,122,0.12);}.dsc:last-child{border-bottom:none;}}
    `}</style>
    <section id="about" className="ds">
      <div className="dsb1"/><div className="dsb2"/>
      <div className="dsw">
        <ScrollReveal className="dsh">
          <div className="dsl"><div className="dsll"/><span className="dslt">Your Dashboard</span><div className="dsll"/></div>
          <h2 className="dsh2">A Mirror to <em>Your Mind</em></h2>
          <p className="dssub">Our psychology-first approach helps you recognize patterns, process emotions, and build mental resilience.</p>
        </ScrollReveal>
        <div className="dsgrid">
          <ScrollReveal><div className="dsc">
            <div className="dscl">Today's Check-in</div>
            <h3 className="dsct">Emotional Check-in</h3>
            <div className="dsmoods">
              {[{icon:Smile,l:"Expansive",on:true},{icon:Meh,l:"Balanced",on:false},{icon:Frown,l:"Constrained",on:false}].map(m=>(
                <button key={m.l} className={`dsmb ${m.on?'on':''}`}><m.icon size={26} className="dsmi"/><span className="dsml">{m.l}</span></button>
              ))}
            </div>
          </div></ScrollReveal>

          <ScrollReveal delay={.1}><div className="dsc">
            <div className="dscl">Daily Wisdom</div>
            <h3 className="dsct">Cognitive Insight</h3>
            <div className="dsiq">
              <div className="dsii"><Bell size={18}/></div>
              <p className="dsiqt">"Notice the thought without becoming the thought. Observe its shape, then let it drift like a cloud."</p>
            </div>
          </div></ScrollReveal>

          <ScrollReveal delay={.15}><div className="dsc">
            <div className="dscl">Progress</div>
            <h3 className="dsct">Micro-Habits</h3>
            <div className="dspb"><div className="dspf"/><span className="dspp">50%</span></div>
            <div className="dstasks">
              {tasks.map(t=>(
                <div key={t.label} className="dstask">
                  {t.done ? <CheckCircle2 size={15} style={{color:'#0a8c7a',flexShrink:0}}/> : <Circle size={15} style={{color:'rgba(10,140,122,.3)',flexShrink:0}}/>}
                  <span className={`dstxt ${t.done?'done':''}`}>{t.label}</span>
                </div>
              ))}
            </div>
          </div></ScrollReveal>

          <ScrollReveal delay={.2}><div className="dsc">
            <div className="dscl">This Week</div>
            <h3 className="dsct">Neuro-Trend Analysis</h3>
            <div className="dschart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodData}>
                  <defs>
                    <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0a8c7a" stopOpacity={0.18}/>
                      <stop offset="95%" stopColor="#0a8c7a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(10,140,122,0.1)" vertical={false}/>
                  <XAxis dataKey="day" tick={{fontSize:10,fontFamily:'Jost',fill:'#0a8c7a',letterSpacing:'0.1em'}} axisLine={false} tickLine={false} dy={10}/>
                  <YAxis domain={[0,10]} hide/>
                  <Tooltip contentStyle={{backgroundColor:'#faf9f6',border:'1px solid rgba(10,140,122,0.2)',borderRadius:'0',fontFamily:'Cormorant Garamond',fontSize:'13px',color:'#042d26',boxShadow:'0 4px 24px rgba(6,90,78,0.1)'}}/>
                  <Area type="monotone" dataKey="mood" stroke="#0a8c7a" strokeWidth={1.5} fillOpacity={1} fill="url(#tg)" dot={{r:3,fill:'#0a8c7a',strokeWidth:0}} activeDot={{r:5,fill:'#065a4e',strokeWidth:0}}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div></ScrollReveal>
        </div>
      </div>
    </section>
  </>
);

export default DashboardPreview;
