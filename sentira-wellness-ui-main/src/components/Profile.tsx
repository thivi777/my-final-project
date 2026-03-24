"use client";
import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Edit2, Camera } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser]       = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const go = async ()=>{
      try {
        const token = localStorage.getItem("token");
        const r = await axios.get("http://localhost:5000/api/users/profile",{headers:{Authorization:`Bearer ${token}`}});
        setUser(r.data.data);
      } catch{} finally{setLoading(false);}
    };
    go();
  },[]);

  if(loading) return (
    <div style={{padding:'4rem',textAlign:'center',fontFamily:'Cormorant Garamond,serif',fontSize:'1.1rem',fontStyle:'italic',color:'#0a8c7a'}}>Loading profile…</div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');
        .pr{max-width:880px;margin:0 auto;}
        .prh{background:linear-gradient(135deg,#042d26,#065a4e);padding:3rem;margin-bottom:1.5px;position:relative;overflow:hidden;}
        .prh::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#c9a84c,#e8c97a,#c9a84c);}
        .prb1{position:absolute;top:-4rem;right:-4rem;width:280px;height:280px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(10,140,122,0.2) 0%,transparent 70%);}
        .prb2{position:absolute;bottom:-3rem;left:-3rem;width:200px;height:200px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(201,168,76,0.1) 0%,transparent 70%);}
        .prbg{position:absolute;right:-2rem;bottom:-3rem;font-family:'Playfair Display',serif;font-size:11rem;font-weight:700;color:rgba(201,168,76,0.06);pointer-events:none;user-select:none;line-height:1;}
        .prhi{display:flex;align-items:center;gap:2rem;position:relative;z-index:1;flex-wrap:wrap;}
        .pravw{position:relative;flex-shrink:0;}
        .prav{width:88px;height:88px;background:rgba(224,244,241,0.1);border:2px solid rgba(201,168,76,0.35);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:400;color:#e8c97a;overflow:hidden;border-radius:50%;}
        .prav img{width:100%;height:100%;object-fit:cover;}
        .pracam{position:absolute;bottom:-4px;right:-4px;width:27px;height:27px;background:#c9a84c;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#042d26;opacity:0;transition:opacity .25s;}
        .pravw:hover .pracam{opacity:1;}
        .prname{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:400;color:#faf9f6;line-height:1.1;margin-bottom:.3rem;}
        .premail{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:300;font-style:italic;color:rgba(224,244,241,.5);margin-bottom:1rem;}
        .practs{display:flex;gap:.75rem;flex-wrap:wrap;}
        .practn{font-family:'Jost',sans-serif;font-size:.6rem;font-weight:400;letter-spacing:.18em;text-transform:uppercase;color:rgba(232,201,122,.65);background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);padding:.48rem 1.1rem;cursor:pointer;display:inline-flex;align-items:center;gap:.5rem;transition:all .25s;}
        .practn:hover{background:rgba(201,168,76,0.14);color:#faf9f6;border-color:rgba(201,168,76,.35);}
        .prgrid{display:grid;grid-template-columns:1fr 1fr;gap:0;background:rgba(10,140,122,0.1);border:1px solid rgba(10,140,122,0.15);border-top:none;}
        .prc{background:#faf9f6;padding:2rem;border-right:1px solid rgba(10,140,122,0.12);}
        .prc:last-child{border-right:none;}
        .prch{display:flex;align-items:center;gap:.6rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid rgba(10,140,122,0.1);}
        .prci{color:#0a8c7a;}
        .prct{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:400;color:#042d26;}
        .prrow{display:flex;justify-content:space-between;align-items:center;padding:.65rem 0;border-bottom:1px solid rgba(10,140,122,0.07);}
        .prrow:last-child{border-bottom:none;}
        .prrl{font-family:'Jost',sans-serif;font-size:.62rem;font-weight:300;letter-spacing:.12em;text-transform:uppercase;color:#0a8c7a;}
        .prrv{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:400;color:#042d26;}
        .prtrow{display:flex;align-items:center;justify-content:space-between;padding:.82rem 0;border-bottom:1px solid rgba(10,140,122,0.07);cursor:pointer;transition:opacity .2s;}
        .prtrow:last-child{border-bottom:none;}
        .prtrow:hover{opacity:.8;}
        .prtl{display:flex;align-items:center;gap:.7rem;}
        .prti{color:#0a8c7a;}
        .prtn{font-family:'Jost',sans-serif;font-size:.74rem;font-weight:400;letter-spacing:.06em;color:#042d26;}
        .prtog{width:36px;height:20px;position:relative;transition:background .3s;}
        .prtog.on{background:#065a4e;}
        .prtog.off{background:rgba(10,140,122,0.15);}
        .prtdot{position:absolute;top:3px;width:14px;height:14px;background:#faf9f6;transition:left .3s;}
        .prtog.on .prtdot{left:19px;}
        .prtog.off .prtdot{left:3px;}
        @media(max-width:680px){.prgrid{grid-template-columns:1fr;}.prc{border-right:none;border-bottom:1px solid rgba(10,140,122,0.12);}.prc:last-child{border-bottom:none;}.prh{padding:2rem;}}
      `}</style>

      <motion.div className="pr" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,ease:"easeOut"}}>
        <div className="prh">
          <div className="prb1"/><div className="prb2"/>
          <div className="prbg">S</div>
          <div className="prhi">
            <div className="pravw">
              <div className="prav">
                {user?.avatar ? <img src={user.avatar} alt={user?.name}/> : <span>{user?.name?.[0]??"U"}</span>}
              </div>
              <button className="pracam" aria-label="Change photo"><Camera size={12}/></button>
            </div>
            <div>
              <h1 className="prname">{user?.name??"Your Name"}</h1>
              <p className="premail">{user?.email??"your@email.com"}</p>
              <div className="practs">
                <button className="practn"><Edit2 size={11}/> Edit Profile</button>
                <button className="practn"><Shield size={11}/> Security</button>
              </div>
            </div>
          </div>
        </div>

        <div className="prgrid">
          <div className="prc">
            <div className="prch"><User size={16} className="prci"/><span className="prct">Personal Information</span></div>
            <div className="prrow"><span className="prrl">Full Name</span><span className="prrv">{user?.name??"—"}</span></div>
            <div className="prrow"><span className="prrl">Email Address</span><span className="prrv">{user?.email??"—"}</span></div>
            <div className="prrow"><span className="prrl">Member Since</span><span className="prrv">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}) : "March 2026"}</span></div>
          </div>
          <div className="prc">
            <div className="prch"><Shield size={16} className="prci"/><span className="prct">Account Settings</span></div>
            <div className="prtrow">
              <div className="prtl"><Mail size={15} className="prti"/><span className="prtn">Email Notifications</span></div>
              <div className="prtog on"><div className="prtdot"/></div>
            </div>
            <div className="prtrow">
              <div className="prtl"><Shield size={15} className="prti"/><span className="prtn">Two-Factor Auth</span></div>
              <div className="prtog off"><div className="prtdot"/></div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
