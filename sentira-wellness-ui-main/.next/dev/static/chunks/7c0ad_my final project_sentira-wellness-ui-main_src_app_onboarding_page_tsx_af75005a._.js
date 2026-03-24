(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OnboardingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/document/my final project/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/document/my final project/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS = [
    {
        label: "About you",
        questions: [
            {
                id: "name",
                type: "text",
                icon: "✦",
                q: "What's your preferred name or nickname?",
                sub: "We'll use this to personalise every interaction.",
                placeholder: "e.g. Alex",
                label: "Your name or nickname"
            },
            {
                id: "language",
                type: "options",
                icon: "🌐",
                q: "Which language do you feel most comfortable in?",
                sub: "We'll tailor our tone and content to suit you.",
                options: [
                    {
                        i: "🇬🇧",
                        t: "English"
                    },
                    {
                        i: "🇫🇷",
                        t: "French"
                    },
                    {
                        i: "🇪🇸",
                        t: "Spanish"
                    },
                    {
                        i: "🇩🇪",
                        t: "German"
                    },
                    {
                        i: "🌍",
                        t: "Other"
                    }
                ]
            },
            {
                id: "morning_start",
                type: "options",
                icon: "🌅",
                q: "How do you usually start your day?",
                sub: "This helps us understand your natural rhythm.",
                options: [
                    {
                        i: "📱",
                        t: "Check my phone first thing"
                    },
                    {
                        i: "☕",
                        t: "Quiet coffee or tea"
                    },
                    {
                        i: "🏃",
                        t: "Exercise or movement"
                    },
                    {
                        i: "📓",
                        t: "Journal or meditate"
                    },
                    {
                        i: "⚡",
                        t: "Straight into work"
                    }
                ]
            },
            {
                id: "habit_change",
                type: "text",
                icon: "🔄",
                q: "What's one habit you'd like to change?",
                sub: "Be honest — there's no wrong answer here.",
                placeholder: "e.g. Scrolling before bed",
                label: "Habit to change"
            },
            {
                id: "guidance_pref",
                type: "options",
                icon: "💡",
                q: "Do you prefer short nudges or longer guidance?",
                sub: "We'll match the depth of our support to your preference.",
                options: [
                    {
                        i: "⚡",
                        t: "Short nudges — quick and snappy"
                    },
                    {
                        i: "📖",
                        t: "Longer guidance — deep and thorough"
                    },
                    {
                        i: "🔀",
                        t: "A mix of both"
                    }
                ]
            }
        ]
    },
    {
        label: "Goals",
        questions: [
            {
                id: "top_priority",
                type: "options",
                icon: "🌟",
                q: "What's your top wellness priority right now?",
                sub: "Pick the one that matters most to you today.",
                options: [
                    {
                        i: "😴",
                        t: "Better sleep"
                    },
                    {
                        i: "🧘",
                        t: "Less stress"
                    },
                    {
                        i: "💪",
                        t: "More energy"
                    },
                    {
                        i: "🧠",
                        t: "Mental clarity"
                    },
                    {
                        i: "❤️",
                        t: "Emotional balance"
                    }
                ]
            },
            {
                id: "stress_area",
                type: "options",
                icon: "🚧",
                q: "Which area of life feels most stressful?",
                sub: "Identifying this helps us focus your plan.",
                options: [
                    {
                        i: "💼",
                        t: "Work or career"
                    },
                    {
                        i: "👨‍👩‍👧",
                        t: "Relationships or family"
                    },
                    {
                        i: "💰",
                        t: "Finances"
                    },
                    {
                        i: "🏥",
                        t: "Health or body"
                    },
                    {
                        i: "🔮",
                        t: "Future uncertainty"
                    }
                ]
            },
            {
                id: "small_win",
                type: "text",
                icon: "🏅",
                q: "What's one small win that would make you happy this week?",
                sub: "Even tiny wins build real momentum.",
                placeholder: "e.g. Go to bed before midnight",
                label: "Your small win"
            },
            {
                id: "goal_style",
                type: "options",
                icon: "📊",
                q: "Do you prefer measurable goals or reflective goals?",
                sub: "Both work — it's about what resonates with you.",
                options: [
                    {
                        i: "📈",
                        t: "Measurable goals — stats & numbers"
                    },
                    {
                        i: "🪞",
                        t: "Reflective goals — feelings & growth"
                    },
                    {
                        i: "⚖️",
                        t: "A balance of both"
                    }
                ]
            },
            {
                id: "celebrate",
                type: "options",
                icon: "🎉",
                q: "How do you want to celebrate progress?",
                sub: "Celebrating matters — let's make it meaningful.",
                options: [
                    {
                        i: "🏆",
                        t: "Badges and achievements"
                    },
                    {
                        i: "📊",
                        t: "Seeing my stats grow"
                    },
                    {
                        i: "📓",
                        t: "A personal reflection note"
                    },
                    {
                        i: "🔔",
                        t: "A motivational message"
                    },
                    {
                        i: "🤫",
                        t: "Quietly — I prefer no fanfare"
                    }
                ]
            }
        ]
    },
    {
        label: "Schedule",
        questions: [
            {
                id: "energized_time",
                type: "options",
                icon: "⚡",
                q: "When do you usually feel most energized?",
                sub: "We'll schedule your key activities around your peak time.",
                options: [
                    {
                        i: "☀️",
                        t: "Morning"
                    },
                    {
                        i: "🌤",
                        t: "Afternoon"
                    },
                    {
                        i: "🌙",
                        t: "Evening"
                    }
                ]
            },
            {
                id: "drained_time",
                type: "options",
                icon: "🪫",
                q: "When do you usually feel most drained?",
                sub: "Knowing this helps us avoid overloading you at the wrong time.",
                options: [
                    {
                        i: "☀️",
                        t: "Morning"
                    },
                    {
                        i: "🌤",
                        t: "Afternoon"
                    },
                    {
                        i: "🌙",
                        t: "Evening"
                    },
                    {
                        i: "🎲",
                        t: "Random — it varies"
                    }
                ]
            },
            {
                id: "checkin_length",
                type: "options",
                icon: "⏱",
                q: "How long can you realistically spend on a wellness check-in?",
                sub: "Be honest — we'll build your plan around your schedule.",
                options: [
                    {
                        i: "",
                        t: "5 minutes"
                    },
                    {
                        i: "",
                        t: "10 minutes"
                    },
                    {
                        i: "",
                        t: "15–20 minutes"
                    },
                    {
                        i: "",
                        t: "30+ minutes"
                    }
                ]
            },
            {
                id: "reminder_style",
                type: "options",
                icon: "🔔",
                q: "Do you prefer reminders at fixed times or flexible nudges?",
                sub: "Choose what feels least intrusive.",
                options: [
                    {
                        i: "⏰",
                        t: "Fixed times — same time every day"
                    },
                    {
                        i: "🌊",
                        t: "Flexible nudges — when it feels right"
                    },
                    {
                        i: "🤫",
                        t: "No reminders — I'll open the app myself"
                    }
                ]
            },
            {
                id: "missed_session",
                type: "options",
                icon: "🔁",
                q: "Would you like us to adjust reminders if you miss a session?",
                sub: "We can gently follow up or simply let it go.",
                options: [
                    {
                        i: "✅",
                        t: "Yes — a gentle follow-up helps"
                    },
                    {
                        i: "🚫",
                        t: "No — don't remind me again that day"
                    },
                    {
                        i: "🤔",
                        t: "Only if I've missed two or more in a row"
                    }
                ]
            }
        ]
    },
    {
        label: "Mindset",
        questions: [
            {
                id: "unplanned_reaction",
                type: "options",
                icon: "🌊",
                q: "How do you usually react when things don't go as planned?",
                sub: "No right or wrong — just helps us understand you.",
                options: [
                    {
                        i: "😤",
                        t: "Get frustrated then reset"
                    },
                    {
                        i: "😶",
                        t: "Go quiet and withdraw"
                    },
                    {
                        i: "🔍",
                        t: "Analyse what went wrong"
                    },
                    {
                        i: "🌀",
                        t: "Feel overwhelmed for a while"
                    },
                    {
                        i: "🤷",
                        t: "Adapt and move on quickly"
                    }
                ]
            },
            {
                id: "motivation_type",
                type: "options",
                icon: "🏅",
                q: "What motivates you most?",
                sub: "We'll lean into this style throughout your journey.",
                options: [
                    {
                        i: "💬",
                        t: "Encouragement — kind words & support"
                    },
                    {
                        i: "📊",
                        t: "Stats — tracking progress with numbers"
                    },
                    {
                        i: "🪞",
                        t: "Reflection — journaling & self-awareness"
                    }
                ]
            },
            {
                id: "daily_feel_word",
                type: "text",
                icon: "💬",
                q: "What's one word that describes how you want to feel every day?",
                sub: "This becomes your personal wellness intention.",
                placeholder: "e.g. Calm, Focused, Alive…",
                label: "Your intention word"
            },
            {
                id: "reminder_tone",
                type: "options",
                icon: "🎯",
                q: "Do you prefer gentle reminders or playful challenges?",
                sub: "We'll match our communication style to yours.",
                options: [
                    {
                        i: "🌸",
                        t: "Gentle — soft and encouraging"
                    },
                    {
                        i: "🎮",
                        t: "Playful — fun micro-challenges"
                    },
                    {
                        i: "⚖️",
                        t: "A mix depending on my mood"
                    }
                ]
            },
            {
                id: "struggling_support",
                type: "options",
                icon: "🤝",
                q: "How do you want us to support you when you're struggling?",
                sub: "We'll respect whatever feels right for you.",
                options: [
                    {
                        i: "🫂",
                        t: "Compassionate check-ins"
                    },
                    {
                        i: "📋",
                        t: "A simple action to take right now"
                    },
                    {
                        i: "🧘",
                        t: "A breathing or grounding exercise"
                    },
                    {
                        i: "🤫",
                        t: "Give me space — I'll reach out when ready"
                    }
                ]
            }
        ]
    },
    {
        label: "Your Style",
        questions: [
            {
                id: "tone_pref",
                type: "options",
                icon: "🎨",
                q: "What tone of voice feels most supportive to you?",
                sub: "We'll write every message in this voice.",
                options: [
                    {
                        i: "😊",
                        t: "Friendly — warm and conversational"
                    },
                    {
                        i: "💼",
                        t: "Professional — clear and structured"
                    },
                    {
                        i: "🎉",
                        t: "Playful — light-hearted and fun"
                    },
                    {
                        i: "🌿",
                        t: "Reflective — calm and thoughtful"
                    }
                ]
            },
            {
                id: "gamification",
                type: "options",
                icon: "🎮",
                q: "Do you enjoy streaks and gamification, or prefer calm guidance?",
                sub: "Both approaches work — it's about what keeps you engaged.",
                options: [
                    {
                        i: "🏆",
                        t: "Streaks & gamification — I love a challenge"
                    },
                    {
                        i: "🌿",
                        t: "Calm guidance — no pressure, just progress"
                    },
                    {
                        i: "⚖️",
                        t: "A balance of both"
                    }
                ]
            },
            {
                id: "notification_content",
                type: "options",
                icon: "🔔",
                q: "What would you like in your notifications?",
                sub: "We'll personalise every nudge to your preference.",
                options: [
                    {
                        i: "✨",
                        t: "Inspirational quotes"
                    },
                    {
                        i: "💡",
                        t: "Practical tips"
                    },
                    {
                        i: "🧘",
                        t: "Short exercises"
                    },
                    {
                        i: "🔀",
                        t: "A mix of all three"
                    }
                ]
            },
            {
                id: "checkin_frequency",
                type: "options",
                icon: "📅",
                q: "How often should we check in with you?",
                sub: "You can always change this later in settings.",
                options: [
                    {
                        i: "📆",
                        t: "Daily"
                    },
                    {
                        i: "2️⃣",
                        t: "Twice daily"
                    },
                    {
                        i: "💼",
                        t: "Weekdays only"
                    },
                    {
                        i: "🔀",
                        t: "Let me decide each day"
                    }
                ]
            },
            {
                id: "personal_anchor",
                type: "text",
                icon: "⚓",
                q: "What's one personal anchor we can echo back to you?",
                sub: "A word, phrase, or symbol we'll weave into your reminders.",
                placeholder: "e.g. 'Keep going', a mantra, or an emoji…",
                label: "Your personal anchor"
            }
        ]
    }
];
// ─── Colour tokens ────────────────────────────────────────────────────────────
const PRIMARY = "hsl(161,93%,30%)";
const PRIMARY_LIGHT = "hsl(166,76%,96%)";
const PRIMARY_BORDER = "hsl(166,40%,88%)";
const BG = "hsl(0,0%,96%)";
const BEIGE = "hsl(40,33%,96%)";
const SAND = "hsl(30,30%,85%)";
const FG = "hsl(0,0%,9%)";
const SECONDARY = "hsl(0,0%,32%)";
const MUTED = "hsl(0,0%,63%)";
const BORDER = "hsl(0,0%,88%)";
const BORDER_MID = "hsl(0,0%,80%)";
// ─── SVG icons ────────────────────────────────────────────────────────────────
function IconCheck({ color = "#fff", size = 16 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 16 16",
        fill: "none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 8.5L6.5 12 13 5",
            stroke: color,
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
            lineNumber: 311,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
        lineNumber: 310,
        columnNumber: 5
    }, this);
}
_c = IconCheck;
function IconArrow() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        fill: "none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 8h10M9 4l4 4-4 4",
            stroke: "#fff",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
            lineNumber: 319,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
        lineNumber: 318,
        columnNumber: 5
    }, this);
}
_c1 = IconArrow;
function StepIcon({ idx, color }) {
    const icons = [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 16 16",
            fill: "none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM3 13c0-2.8 2.2-4 5-4s5 1.2 5 4",
                stroke: color,
                strokeWidth: "1.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 326,
                columnNumber: 73
            }, this)
        }, 0, false, {
            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
            lineNumber: 326,
            columnNumber: 5
        }, this),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 16 16",
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "8",
                    cy: "8",
                    r: "5.5",
                    stroke: color,
                    strokeWidth: "1.5"
                }, void 0, false, {
                    fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                    lineNumber: 327,
                    columnNumber: 73
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M5.5 8l2 2 3-3",
                    stroke: color,
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                    lineNumber: 327,
                    columnNumber: 138
                }, this)
            ]
        }, 1, true, {
            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
            lineNumber: 327,
            columnNumber: 5
        }, this),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 16 16",
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "8",
                    cy: "8",
                    r: "5.5",
                    stroke: color,
                    strokeWidth: "1.5"
                }, void 0, false, {
                    fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                    lineNumber: 328,
                    columnNumber: 73
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M8 5.5v2.5l1.5 1.5",
                    stroke: color,
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                    lineNumber: 328,
                    columnNumber: 138
                }, this)
            ]
        }, 2, true, {
            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
            lineNumber: 328,
            columnNumber: 5
        }, this),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 16 16",
            fill: "none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 4h10M3 8h7M3 12h5",
                stroke: color,
                strokeWidth: "1.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 329,
                columnNumber: 73
            }, this)
        }, 3, false, {
            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
            lineNumber: 329,
            columnNumber: 5
        }, this),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 16 16",
            fill: "none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z",
                stroke: color,
                strokeWidth: "1.3",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 330,
                columnNumber: 73
            }, this)
        }, 4, false, {
            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
            lineNumber: 330,
            columnNumber: 5
        }, this)
    ];
    return icons[idx] ?? icons[0];
}
_c2 = StepIcon;
// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            marginBottom: "1.75rem"
        },
        children: STEPS.map((s, i)=>{
            const isDone = i < current;
            const isActive = i === current;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: isDone || isActive ? PRIMARY : "#fff",
                                    border: `2px solid ${isDone || isActive ? PRIMARY : BORDER_MID}`,
                                    boxShadow: isActive ? "0 0 0 4px rgba(10,138,84,0.14)" : "none",
                                    transition: "all 0.3s"
                                },
                                children: [
                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            position: "absolute",
                                            inset: -5,
                                            borderRadius: "50%",
                                            border: `2px solid ${PRIMARY}`,
                                            animation: "pulse-ring 1.8s ease-out infinite",
                                            pointerEvents: "none"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 356,
                                        columnNumber: 19
                                    }, this),
                                    isDone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCheck, {
                                        color: "#fff",
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 364,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIcon, {
                                        idx: i,
                                        color: isActive ? "#fff" : MUTED
                                    }, void 0, false, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 365,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                lineNumber: 347,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 9,
                                    fontWeight: 600,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    whiteSpace: "nowrap",
                                    color: isDone || isActive ? PRIMARY : MUTED
                                },
                                children: isDone ? `${s.label} ✓` : s.label
                            }, void 0, false, {
                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                lineNumber: 369,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                        lineNumber: 345,
                        columnNumber: 13
                    }, this),
                    i < STEPS.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            width: 24,
                            height: 2,
                            background: BORDER,
                            margin: "0 4px",
                            marginBottom: 18,
                            borderRadius: 2,
                            overflow: "hidden"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                inset: 0,
                                background: PRIMARY,
                                width: isDone ? "100%" : "0%",
                                transition: "width 0.5s ease"
                            }
                        }, void 0, false, {
                            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                            lineNumber: 385,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                        lineNumber: 380,
                        columnNumber: 15
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 344,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
        lineNumber: 339,
        columnNumber: 5
    }, this);
}
_c3 = StepIndicator;
function OnboardingPage() {
    _s();
    const [curStep, setCurStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [curQ, setCurQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [finished, setFinished] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const step = STEPS[curStep];
    const q = step.questions[curQ];
    const totalQ = STEPS.reduce((a, s)=>a + s.questions.length, 0);
    const globalQ = STEPS.slice(0, curStep).reduce((a, s)=>a + s.questions.length, 0) + curQ;
    const topbarPct = (globalQ + 1) / totalQ * 100;
    function setAns(id, val) {
        setAnswers((prev)=>({
                ...prev,
                [id]: val
            }));
    }
    function isAnswered() {
        const val = answers[q.id];
        if (q.type === "text") return typeof val === "string" && val.trim().length > 0;
        if (q.type === "multi") return val instanceof Set && val.size > 0;
        return val !== undefined && val !== null;
    }
    function tryNext() {
        if (!isAnswered()) return;
        if (curQ < step.questions.length - 1) {
            setCurQ(curQ + 1);
        } else if (curStep < STEPS.length - 1) {
            setCurStep(curStep + 1);
            setCurQ(0);
        } else {
            setFinished(true);
        }
    }
    function toggleMulti(id, i) {
        const prev = answers[id] instanceof Set ? answers[id] : new Set();
        const next = new Set(prev);
        next.has(i) ? next.delete(i) : next.add(i);
        setAns(id, next);
    }
    const isLastQ = curQ === step.questions.length - 1 && curStep === STEPS.length - 1;
    // ── Inline styles ───────────────────────────────────────────────────────────
    const s = {
        page: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1rem",
            fontFamily: "inherit",
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(160deg, ${BG} 0%, ${BEIGE} 60%, hsl(166,76%,96%) 100%)`
        },
        wrap: {
            width: "100%",
            maxWidth: 440,
            position: "relative",
            zIndex: 1
        },
        card: {
            background: "#fff",
            border: `1px solid ${BORDER}`,
            borderRadius: 24,
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            width: "100%"
        },
        topbar: (pct)=>({
                position: "absolute",
                top: 0,
                left: 0,
                height: 3,
                width: `${pct}%`,
                background: PRIMARY,
                transition: "width 0.5s ease",
                borderRadius: "0 3px 0 0"
            }),
        iconBox: {
            width: 48,
            height: 48,
            borderRadius: 14,
            background: PRIMARY_LIGHT,
            border: `1px solid ${PRIMARY_BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
            fontSize: 20
        },
        h2: {
            fontSize: 20,
            fontWeight: 600,
            color: FG,
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: 6
        },
        sub: {
            fontSize: 13,
            color: MUTED,
            textAlign: "center",
            lineHeight: 1.55,
            marginBottom: "1.25rem"
        },
        fieldLabel: {
            display: "block",
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            color: SECONDARY,
            marginBottom: 6
        },
        input: {
            width: "100%",
            height: 48,
            borderRadius: 14,
            padding: "0 16px",
            fontSize: 15,
            background: BG,
            border: `1.5px solid ${BORDER_MID}`,
            color: FG,
            fontFamily: "inherit",
            transition: "border-color 0.2s",
            outline: "none",
            display: "block",
            marginBottom: "1.25rem"
        },
        optRow: {
            display: "flex",
            flexDirection: "column",
            gap: 7,
            marginBottom: "1.25rem"
        },
        opt: (sel)=>({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 14,
                background: sel ? PRIMARY_LIGHT : BG,
                border: `1.5px solid ${sel ? PRIMARY : BORDER}`,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                fontFamily: "inherit",
                transition: "all 0.18s"
            }),
        radio: (sel)=>({
                width: 16,
                height: 16,
                borderRadius: "50%",
                flexShrink: 0,
                border: `2px solid ${sel ? PRIMARY : BORDER_MID}`,
                background: sel ? PRIMARY : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.18s"
            }),
        grid2: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: "1.25rem"
        },
        tile: (sel)=>({
                padding: 12,
                borderRadius: 14,
                background: sel ? PRIMARY_LIGHT : BG,
                border: `1.5px solid ${sel ? PRIMARY : BORDER}`,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
                position: "relative",
                transition: "all 0.18s"
            }),
        scaleRow: {
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginBottom: "1.25rem"
        },
        scaleBtn: (sel)=>({
                width: 48,
                height: 48,
                borderRadius: 12,
                background: sel ? PRIMARY : BG,
                border: `1.5px solid ${sel ? PRIMARY : BORDER}`,
                color: sel ? "#fff" : SECONDARY,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.18s"
            }),
        cta: (on)=>({
                width: "100%",
                height: 48,
                borderRadius: 14,
                border: "none",
                background: on ? PRIMARY : BORDER,
                color: on ? "#fff" : MUTED,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: on ? "pointer" : "default",
                opacity: on ? 1 : 0.45,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.2s"
            })
    };
    // ── Render ──────────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ob-fade { animation: fadeUp 0.25s ease; }
        .ob-cta:hover:not(:disabled) { filter: brightness(1.08); transform: translateY(-1px); }
        .ob-opt:hover  { border-color: ${PRIMARY} !important; background: ${PRIMARY_LIGHT} !important; }
        .ob-tile:hover { border-color: ${PRIMARY} !important; background: ${PRIMARY_LIGHT} !important; }
        .ob-scale:hover { border-color: ${PRIMARY} !important; }
        .ob-inp:focus { border-color: ${PRIMARY} !important; background: #fff !important; }
      `
            }, void 0, false, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 526,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: s.page,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            width: 300,
                            height: 300,
                            borderRadius: "50%",
                            background: "radial-gradient(circle,rgba(10,138,84,0.07) 0%,transparent 70%)",
                            filter: "blur(60px)",
                            top: -70,
                            left: -70,
                            pointerEvents: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                        lineNumber: 545,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            width: 260,
                            height: 260,
                            borderRadius: "50%",
                            background: "radial-gradient(circle,rgba(100,160,210,0.1) 0%,transparent 70%)",
                            filter: "blur(70px)",
                            bottom: 0,
                            right: 0,
                            pointerEvents: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                        lineNumber: 546,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: s.wrap,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIndicator, {
                                current: curStep
                            }, void 0, false, {
                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                lineNumber: 549,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: s.card,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: s.topbar(topbarPct)
                                    }, void 0, false, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 552,
                                        columnNumber: 13
                                    }, this),
                                    finished ? /* ── Done ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ob-fade",
                                        style: {
                                            textAlign: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 68,
                                                    height: 68,
                                                    borderRadius: "50%",
                                                    background: PRIMARY_LIGHT,
                                                    border: `2px solid ${PRIMARY_BORDER}`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    margin: "0 auto 1.25rem",
                                                    fontSize: 28
                                                },
                                                children: "💚"
                                            }, void 0, false, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 557,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    ...s.h2,
                                                    marginBottom: 6
                                                },
                                                children: [
                                                    "You're all set, ",
                                                    String(answers["name"] || "there"),
                                                    "!"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 560,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    ...s.sub,
                                                    marginBottom: "1.5rem"
                                                },
                                                children: "Your personalised wellness plan is ready. Your journey starts now."
                                            }, void 0, false, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 563,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: BEIGE,
                                                    border: `1px solid ${SAND}`,
                                                    borderRadius: 14,
                                                    padding: "12px 16px",
                                                    marginBottom: "1.25rem"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 13,
                                                        fontStyle: "italic",
                                                        color: SECONDARY,
                                                        lineHeight: 1.6
                                                    },
                                                    children: "“Each step you take is a win for your future self.”"
                                                }, void 0, false, {
                                                    fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                    lineNumber: 567,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 566,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                style: {
                                                    ...s.cta(true),
                                                    cursor: "default"
                                                },
                                                disabled: true,
                                                children: "Starting your journey…"
                                            }, void 0, false, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 571,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 556,
                                        columnNumber: 15
                                    }, this) : /* ── Question ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ob-fade",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 6,
                                                    marginBottom: "1.5rem"
                                                },
                                                children: [
                                                    step.questions.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                height: 3,
                                                                width: 28,
                                                                borderRadius: 2,
                                                                background: i <= curQ ? PRIMARY : BORDER,
                                                                opacity: i < curQ ? 0.55 : 1,
                                                                transition: "all 0.3s"
                                                            }
                                                        }, i, false, {
                                                            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                            lineNumber: 583,
                                                            columnNumber: 21
                                                        }, this)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            marginLeft: "auto",
                                                            fontSize: 11,
                                                            color: MUTED,
                                                            whiteSpace: "nowrap"
                                                        },
                                                        children: [
                                                            curQ + 1,
                                                            " of ",
                                                            step.questions.length
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 590,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 581,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: s.iconBox,
                                                children: q.icon
                                            }, void 0, false, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 596,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: s.h2,
                                                children: q.q
                                            }, void 0, false, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 597,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: s.sub,
                                                children: q.sub
                                            }, void 0, false, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 598,
                                                columnNumber: 17
                                            }, this),
                                            q.type === "text" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: "1.25rem"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: s.fieldLabel,
                                                        children: q.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 603,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        autoFocus: true,
                                                        className: "ob-inp",
                                                        type: "text",
                                                        placeholder: q.placeholder,
                                                        value: String(answers[q.id] ?? ""),
                                                        onChange: (e)=>setAns(q.id, e.target.value),
                                                        onKeyDown: (e)=>e.key === "Enter" && tryNext(),
                                                        style: s.input
                                                    }, void 0, false, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 604,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 602,
                                                columnNumber: 19
                                            }, this),
                                            q.type === "options" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: s.optRow,
                                                children: q.options.map((o, i)=>{
                                                    const sel = answers[q.id] === i;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "ob-opt",
                                                        style: s.opt(sel),
                                                        onClick: ()=>setAns(q.id, i),
                                                        children: [
                                                            o.i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 16,
                                                                    width: 20,
                                                                    textAlign: "center"
                                                                },
                                                                children: o.i
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 624,
                                                                columnNumber: 35
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: s.radio(sel),
                                                                children: sel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        width: 6,
                                                                        height: 6,
                                                                        borderRadius: "50%",
                                                                        background: "#fff"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                    lineNumber: 626,
                                                                    columnNumber: 37
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 625,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 500,
                                                                    color: sel ? FG : SECONDARY
                                                                },
                                                                children: o.t
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 628,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 623,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 619,
                                                columnNumber: 19
                                            }, this),
                                            q.type === "multi" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: s.grid2,
                                                children: q.options.map((o, i)=>{
                                                    const sel = answers[q.id] instanceof Set && answers[q.id].has(i);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "ob-tile",
                                                        style: s.tile(sel),
                                                        onClick: ()=>toggleMulti(q.id, i),
                                                        children: [
                                                            sel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    position: "absolute",
                                                                    top: 7,
                                                                    right: 7,
                                                                    width: 16,
                                                                    height: 16,
                                                                    borderRadius: "50%",
                                                                    background: PRIMARY,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCheck, {
                                                                    color: "#fff",
                                                                    size: 10
                                                                }, void 0, false, {
                                                                    fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                    lineNumber: 644,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 643,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: "block",
                                                                    fontSize: 16,
                                                                    marginBottom: 5
                                                                },
                                                                children: o.i
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 647,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    fontWeight: 600,
                                                                    color: sel ? "hsl(161,93%,22%)" : SECONDARY,
                                                                    lineHeight: 1.35
                                                                },
                                                                children: o.t
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 648,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 637,
                                                columnNumber: 19
                                            }, this),
                                            q.type === "scale" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: s.scaleRow,
                                                children: Array.from({
                                                    length: q.max - q.min + 1
                                                }, (_, k)=>q.min + k).map((v)=>{
                                                    const sel = answers[q.id] === v;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "ob-scale",
                                                        style: s.scaleBtn(sel),
                                                        onClick: ()=>setAns(q.id, v),
                                                        children: v
                                                    }, v, false, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 661,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 657,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "ob-cta",
                                                style: s.cta(isAnswered()),
                                                onClick: tryNext,
                                                disabled: !isAnswered(),
                                                children: [
                                                    isLastQ ? "Finish" : "Continue",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconArrow, {}, void 0, false, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 671,
                                                        columnNumber: 53
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 670,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, `${curStep}-${curQ}`, true, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 578,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                lineNumber: 551,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    textAlign: "center",
                                    fontSize: 10,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: MUTED,
                                    marginTop: "0.75rem"
                                },
                                children: [
                                    "Step ",
                                    curStep + 1,
                                    " of ",
                                    STEPS.length,
                                    " · Question ",
                                    globalQ + 1,
                                    " of ",
                                    totalQ
                                ]
                            }, void 0, true, {
                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                lineNumber: 679,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 543,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(OnboardingPage, "9Uk23nwNqk8c6vDwHKsV8l8ba1g=");
_c4 = OnboardingPage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "IconCheck");
__turbopack_context__.k.register(_c1, "IconArrow");
__turbopack_context__.k.register(_c2, "StepIcon");
__turbopack_context__.k.register(_c3, "StepIndicator");
__turbopack_context__.k.register(_c4, "OnboardingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=7c0ad_my%20final%20project_sentira-wellness-ui-main_src_app_onboarding_page_tsx_af75005a._.js.map