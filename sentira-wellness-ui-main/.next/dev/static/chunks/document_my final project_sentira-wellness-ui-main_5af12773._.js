(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OnboardingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/document/my final project/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/document/my final project/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/document/my final project/sentira-wellness-ui-main/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/document/my final project/sentira-wellness-ui-main/src/hooks/use-toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const goals = [
    {
        id: "reduce-stress",
        label: "Reduce Daily Stress",
        icon: "🌬"
    },
    {
        id: "better-sleep",
        label: "Improve Sleep Quality",
        icon: "🌙"
    },
    {
        id: "emotional",
        label: "Emotional Awareness",
        icon: "🧠"
    },
    {
        id: "productivity",
        label: "Boost Productivity",
        icon: "☀️"
    },
    {
        id: "positivity",
        label: "Cultivate Positivity",
        icon: "😊"
    },
    {
        id: "mindfulness",
        label: "Build Mindfulness",
        icon: "🌿"
    }
];
const schedules = [
    {
        id: "morning",
        label: "Morning",
        time: "8:00 AM",
        icon: "☀️"
    },
    {
        id: "afternoon",
        label: "Afternoon",
        time: "1:00 PM",
        icon: "✦"
    },
    {
        id: "evening",
        label: "Evening",
        time: "8:00 PM",
        icon: "🌙"
    }
];
const stepMeta = [
    {
        label: "Name"
    },
    {
        label: "Goals"
    },
    {
        label: "Schedule"
    },
    {
        label: "Launch"
    }
];
function CheckIcon({ color = "currentColor", size = 16 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 16 16",
        fill: "none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 8.5L6.5 12 13 5",
            stroke: color,
            strokeWidth: "1.6",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c = CheckIcon;
function ArrowRight() {
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
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_c1 = ArrowRight;
function StepIcon({ step, active }) {
    const color = active ? "#16a34a" : "rgba(255,255,255,0.3)";
    if (step === 1) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 16 16",
        fill: "none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM3 13c0-2.8 2.2-4 5-4s5 1.2 5 4",
            stroke: color,
            strokeWidth: "1.4",
            strokeLinecap: "round"
        }, void 0, false, {
            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
            lineNumber: 64,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
        lineNumber: 63,
        columnNumber: 7
    }, this);
    if (step === 2) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 16 16",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "8",
                cy: "8",
                r: "5.5",
                stroke: color,
                strokeWidth: "1.4"
            }, void 0, false, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5.5 8l2 2 3-3",
                stroke: color,
                strokeWidth: "1.4",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
        lineNumber: 74,
        columnNumber: 7
    }, this);
    if (step === 3) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 16 16",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "8",
                cy: "8",
                r: "5.5",
                stroke: color,
                strokeWidth: "1.4"
            }, void 0, false, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 5.5v2.5l1.5 1.5",
                stroke: color,
                strokeWidth: "1.4",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
        lineNumber: 81,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 16 16",
        fill: "none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 8.5L6.5 12 13 5",
            stroke: color,
            strokeWidth: "1.4",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_c2 = StepIcon;
function StepIndicator({ current }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center mb-8",
        children: stepMeta.map((s, i)=>{
            const stepNum = i + 1;
            const isDone = current > stepNum;
            const isActive = current === stepNum;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                                style: {
                                    background: isDone ? "#16a34a" : isActive ? "#fff" : "rgba(255,255,255,0.05)",
                                    border: isDone ? "1.5px solid #16a34a" : isActive ? "1.5px solid #4ade80" : "1.5px solid rgba(255,255,255,0.12)",
                                    boxShadow: isActive ? "0 0 0 4px rgba(74,222,128,0.18)" : "none"
                                },
                                children: [
                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute inset-0 rounded-full border border-green-400 pointer-events-none",
                                        style: {
                                            animation: "pulse-ring 1.8s ease-out infinite"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 19
                                    }, this),
                                    isDone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {
                                        color: "#fff",
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIcon, {
                                        step: stepNum,
                                        active: isActive
                                    }, void 0, false, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute mt-11 text-[10px] font-medium tracking-widest uppercase whitespace-nowrap hidden md:block",
                                style: {
                                    color: isActive ? "#4ade80" : isDone ? "#16a34a" : "rgba(255,255,255,0.2)"
                                },
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                        lineNumber: 109,
                        columnNumber: 13
                    }, this),
                    i < stepMeta.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mx-1 h-0.5 w-11 overflow-hidden",
                        style: {
                            background: "rgba(255,255,255,0.08)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-y-0 left-0 bg-green-500 transition-all duration-500",
                            style: {
                                width: isDone ? "100%" : "0%"
                            }
                        }, void 0, false, {
                            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                            lineNumber: 162,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                        lineNumber: 158,
                        columnNumber: 15
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 108,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_c3 = StepIndicator;
function OnboardingPage() {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedGoals, setSelectedGoals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [schedule, setSchedule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("afternoon");
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const goStep = (n)=>setStep(n);
    const toggleGoal = (id)=>{
        setSelectedGoals((prev)=>{
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const finish = ()=>{
        setDone(true);
        toast({
            title: "All set! 🌿",
            description: "Welcome to your personalized wellness space."
        });
        setTimeout(()=>router.push("/app"), 1200);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .panel-enter { animation: fadeUp 0.28s ease; }
      `
            }, void 0, false, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex items-center justify-center p-4 relative overflow-hidden",
                style: {
                    background: "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(74,222,128,0.09) 0%, transparent 65%), linear-gradient(160deg, #0a0f0a 0%, #0c1a0e 50%, #090c12 100%)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full",
                        style: {
                            background: "radial-gradient(circle, rgba(74,222,128,0.25) 0%, transparent 70%)",
                            filter: "blur(70px)",
                            opacity: 0.15
                        }
                    }, void 0, false, {
                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full",
                        style: {
                            background: "radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%)",
                            filter: "blur(80px)",
                            opacity: 0.08
                        }
                    }, void 0, false, {
                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-md relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIndicator, {
                                current: step
                            }, void 0, false, {
                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative rounded-3xl overflow-hidden",
                                style: {
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    backdropFilter: "blur(24px)",
                                    boxShadow: "0 0 0 1px rgba(74,222,128,0.06), 0 32px 64px rgba(0,0,0,0.5)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 left-0 h-0.5 transition-all duration-500",
                                        style: {
                                            width: `${step / 4 * 100}%`,
                                            background: "linear-gradient(90deg, transparent, #4ade80, transparent)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-8",
                                        children: [
                                            step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel-enter space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 text-xl",
                                                                style: {
                                                                    background: "rgba(74,222,128,0.1)",
                                                                    border: "1px solid rgba(74,222,128,0.2)"
                                                                },
                                                                children: "✦"
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-2xl font-semibold text-white mb-1",
                                                                style: {
                                                                    letterSpacing: "-0.02em"
                                                                },
                                                                children: "What's your name?"
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 282,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm",
                                                                style: {
                                                                    color: "rgba(255,255,255,0.42)",
                                                                    lineHeight: 1.6
                                                                },
                                                                children: "We'd love to know what to call you."
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 288,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-[10px] font-medium uppercase tracking-widest mb-2",
                                                                style: {
                                                                    color: "rgba(255,255,255,0.38)"
                                                                },
                                                                children: "Your Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 297,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                placeholder: "e.g. Alex",
                                                                value: name,
                                                                autoComplete: "off",
                                                                onChange: (e)=>setName(e.target.value),
                                                                onKeyDown: (e)=>e.key === "Enter" && name.trim() && goStep(2),
                                                                className: "w-full h-12 rounded-2xl px-4 text-white text-base outline-none transition-all",
                                                                style: {
                                                                    background: "rgba(255,255,255,0.06)",
                                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                                    fontFamily: "inherit"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 303,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>goStep(2),
                                                        disabled: !name.trim(),
                                                        className: "w-full h-12 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:-translate-y-px",
                                                        style: {
                                                            background: "linear-gradient(135deg, #16a34a, #22c55e)",
                                                            boxShadow: name.trim() ? "0 8px 24px rgba(22,163,74,0.3)" : "none"
                                                        },
                                                        children: [
                                                            "Continue ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRight, {}, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 332,
                                                                columnNumber: 30
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 17
                                            }, this),
                                            step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel-enter space-y-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-2xl font-semibold text-white mb-1",
                                                                style: {
                                                                    letterSpacing: "-0.02em"
                                                                },
                                                                children: [
                                                                    "Hey ",
                                                                    name,
                                                                    "! 🌿"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm",
                                                                style: {
                                                                    color: "rgba(255,255,255,0.42)"
                                                                },
                                                                children: "Pick your main wellness goals."
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-2",
                                                        children: goals.map((g)=>{
                                                            const sel = selectedGoals.has(g.id);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>toggleGoal(g.id),
                                                                className: "relative p-3 rounded-2xl text-left transition-all",
                                                                style: {
                                                                    background: sel ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.04)",
                                                                    border: sel ? "1px solid rgba(74,222,128,0.4)" : "1px solid rgba(255,255,255,0.08)"
                                                                },
                                                                children: [
                                                                    sel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "absolute top-2 right-2 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {
                                                                            color: "#fff",
                                                                            size: 10
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                            lineNumber: 374,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                        lineNumber: 373,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "block text-base mb-1",
                                                                        children: g.icon
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                        lineNumber: 377,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-medium leading-snug block",
                                                                        style: {
                                                                            color: sel ? "#86efac" : "rgba(255,255,255,0.5)"
                                                                        },
                                                                        children: g.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                        lineNumber: 378,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, g.id, true, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 359,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>goStep(3),
                                                        disabled: selectedGoals.size === 0,
                                                        className: "w-full h-12 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:-translate-y-px",
                                                        style: {
                                                            background: "linear-gradient(135deg, #16a34a, #22c55e)",
                                                            boxShadow: selectedGoals.size > 0 ? "0 8px 24px rgba(22,163,74,0.3)" : "none"
                                                        },
                                                        children: [
                                                            "Next Step ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRight, {}, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 405,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 393,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 339,
                                                columnNumber: 17
                                            }, this),
                                            step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel-enter space-y-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-2xl font-semibold text-white mb-1",
                                                                style: {
                                                                    letterSpacing: "-0.02em"
                                                                },
                                                                children: "Daily Check-ins"
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm",
                                                                style: {
                                                                    color: "rgba(255,255,255,0.42)"
                                                                },
                                                                children: "When would you like to log your mood?"
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 420,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-2",
                                                        children: schedules.map((s)=>{
                                                            const sel = schedule === s.id;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setSchedule(s.id),
                                                                className: "flex items-center justify-between px-4 py-3 rounded-2xl transition-all",
                                                                style: {
                                                                    background: sel ? "rgba(74,222,128,0.07)" : "rgba(255,255,255,0.04)",
                                                                    border: sel ? "1px solid rgba(74,222,128,0.35)" : "1px solid rgba(255,255,255,0.08)"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all",
                                                                                style: {
                                                                                    background: sel ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.05)"
                                                                                },
                                                                                children: s.icon
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                                lineNumber: 446,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-left",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-sm font-medium",
                                                                                        style: {
                                                                                            color: sel ? "#fff" : "rgba(255,255,255,0.7)"
                                                                                        },
                                                                                        children: s.label
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                                        lineNumber: 457,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-xs",
                                                                                        style: {
                                                                                            color: "rgba(255,255,255,0.3)"
                                                                                        },
                                                                                        children: s.time
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                                        lineNumber: 465,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                                lineNumber: 456,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                        lineNumber: 445,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-4 h-4 rounded-full relative flex items-center justify-center transition-all",
                                                                        style: {
                                                                            border: sel ? "1.5px solid #22c55e" : "1.5px solid rgba(255,255,255,0.2)",
                                                                            background: sel ? "#22c55e" : "transparent"
                                                                        },
                                                                        children: sel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-1.5 h-1.5 rounded-full bg-white"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                            lineNumber: 484,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                        lineNumber: 474,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, s.id, true, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 432,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 428,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>goStep(4),
                                                        className: "w-full h-12 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 text-white hover:-translate-y-px transition-all",
                                                        style: {
                                                            background: "linear-gradient(135deg, #16a34a, #22c55e)",
                                                            boxShadow: "0 8px 24px rgba(22,163,74,0.3)"
                                                        },
                                                        children: [
                                                            "Almost there ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRight, {}, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 500,
                                                                columnNumber: 34
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 492,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 412,
                                                columnNumber: 17
                                            }, this),
                                            step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel-enter space-y-6 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl",
                                                                style: {
                                                                    background: "radial-gradient(circle, rgba(74,222,128,0.18) 0%, rgba(74,222,128,0.04) 100%)",
                                                                    border: "1px solid rgba(74,222,128,0.28)",
                                                                    boxShadow: "0 0 40px rgba(74,222,128,0.15)"
                                                                },
                                                                children: "💚"
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 509,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-2xl font-semibold text-white mb-1",
                                                                style: {
                                                                    letterSpacing: "-0.02em"
                                                                },
                                                                children: "You're all set!"
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 520,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm px-4",
                                                                style: {
                                                                    color: "rgba(255,255,255,0.42)",
                                                                    lineHeight: 1.6
                                                                },
                                                                children: "Your dashboard is ready. Your wellness journey starts now."
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 526,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 rounded-2xl text-left",
                                                        style: {
                                                            background: "rgba(74,222,128,0.05)",
                                                            border: "1px solid rgba(74,222,128,0.12)"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs italic",
                                                            style: {
                                                                color: "rgba(134,239,172,0.65)",
                                                                lineHeight: 1.6
                                                            },
                                                            children: '"Each step you take is a win for your future self."'
                                                        }, void 0, false, {
                                                            fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                            lineNumber: 541,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 534,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: finish,
                                                        disabled: done,
                                                        className: "w-full h-12 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60",
                                                        style: {
                                                            background: "linear-gradient(135deg, #15803d, #22c55e, #4ade80)",
                                                            boxShadow: "0 12px 32px rgba(22,163,74,0.4), 0 0 0 1px rgba(74,222,128,0.2)"
                                                        },
                                                        children: [
                                                            "Get Started",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                width: "16",
                                                                height: "16",
                                                                viewBox: "0 0 16 16",
                                                                fill: "none",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M2 8h9M8 5l3 3-3 3",
                                                                    stroke: "#fff",
                                                                    strokeWidth: "1.5",
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                    lineNumber: 562,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                                lineNumber: 561,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                                lineNumber: 507,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-[10px] font-medium uppercase tracking-widest mt-4",
                                style: {
                                    color: "rgba(255,255,255,0.18)"
                                },
                                children: [
                                    "Step ",
                                    step,
                                    " of 4"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                                lineNumber: 577,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/document/my final project/sentira-wellness-ui-main/src/app/onboarding/page.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(OnboardingPage, "1nO3TCwAuLt9OJIEYK7hJTq3mh0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$document$2f$my__final__project$2f$sentira$2d$wellness$2d$ui$2d$main$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c4 = OnboardingPage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "CheckIcon");
__turbopack_context__.k.register(_c1, "ArrowRight");
__turbopack_context__.k.register(_c2, "StepIcon");
__turbopack_context__.k.register(_c3, "StepIndicator");
__turbopack_context__.k.register(_c4, "OnboardingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/document/my final project/sentira-wellness-ui-main/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/document/my final project/sentira-wellness-ui-main/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=document_my%20final%20project_sentira-wellness-ui-main_5af12773._.js.map