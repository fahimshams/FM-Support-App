import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/ImageDiagnosisDemoPage.tsx
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
export default function ImageDiagnosisDemoPage() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [visualIssue, setVisualIssue] = useState("THREAD_BREAKING");
    const [analysis, setAnalysis] = useState(null);
    const [running, setRunning] = useState(false);
    function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setSelectedFile(file);
        setAnalysis(null);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    }
    function runDemoAnalysis() {
        setRunning(true);
        setAnalysis(null);
        setTimeout(() => {
            const result = buildDemoAnalysis(visualIssue);
            setAnalysis(result);
            setRunning(false);
        }, 600);
    }
    const canRun = !!selectedFile;
    return (_jsxs("div", { style: { maxWidth: "1400px", margin: "0 auto" }, children: [_jsxs("div", { style: {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "24px",
                }, children: [_jsxs("div", { children: [_jsx("h2", { style: { fontSize: "1.75rem", marginBottom: "8px", color: "#1A1F36", fontWeight: 600 }, children: "AI Image Diagnosis (Demo)" }), _jsx("p", { style: {
                                    fontSize: "0.95rem",
                                    color: "#718096",
                                    maxWidth: "600px",
                                }, children: "Upload a clear photo of the sewing problem (stitches, needle, or feed area). Zoje AI will simulate how it could highlight likely causes & checks\u2014this is a demo only, no real image processing yet." })] }), _jsx("button", { onClick: () => navigate("/ticket"), style: {
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "1px solid #E2E8F0",
                            background: "#FFFFFF",
                            color: "#4A5568",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            transition: "all 0.2s ease",
                        }, onMouseEnter: (e) => {
                            e.currentTarget.style.background = "#F5F7FA";
                            e.currentTarget.style.borderColor = "#CBD5E0";
                        }, onMouseLeave: (e) => {
                            e.currentTarget.style.background = "#FFFFFF";
                            e.currentTarget.style.borderColor = "#E2E8F0";
                        }, children: "\u2190 Back to Report Issue" })] }), _jsxs("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                    gap: "24px",
                }, children: [_jsxs(Card, { style: { padding: "24px" }, children: [_jsx("h3", { style: {
                                    fontSize: "1.1rem",
                                    marginBottom: "16px",
                                    fontWeight: 600,
                                    color: "#1A1F36",
                                }, children: "1. Upload a photo of the problem" }), _jsxs("label", { style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "12px",
                                    borderRadius: "12px",
                                    border: "2px dashed #CBD5E0",
                                    padding: "32px 20px",
                                    cursor: "pointer",
                                    background: "#F5F7FA",
                                    transition: "all 0.2s ease",
                                }, onMouseEnter: (e) => {
                                    e.currentTarget.style.borderColor = "#0066CC";
                                    e.currentTarget.style.background = "#E6F2FF";
                                }, onMouseLeave: (e) => {
                                    e.currentTarget.style.borderColor = "#CBD5E0";
                                    e.currentTarget.style.background = "#F5F7FA";
                                }, children: [_jsx("div", { style: {
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "12px",
                                            background: "#0066CC",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.5rem",
                                            color: "white",
                                        }, children: "\uD83D\uDCF7" }), _jsx("div", { style: {
                                            fontSize: "0.95rem",
                                            fontWeight: 600,
                                            color: "#1A1F36",
                                        }, children: "Click to upload image" }), _jsx("div", { style: {
                                            fontSize: "0.875rem",
                                            color: "#718096",
                                            textAlign: "center",
                                        }, children: "Close-up of stitches, needle area, or feed dog is best." }), _jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, style: { display: "none" } })] }), selectedFile && (_jsxs("div", { style: {
                                    marginTop: "16px",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    background: "#E6F2FF",
                                    border: "1px solid #B3D9FF",
                                    fontSize: "0.875rem",
                                    color: "#1A1F36",
                                }, children: ["Selected file: ", _jsx("strong", { children: selectedFile.name })] })), previewUrl && (_jsx("div", { style: {
                                    marginTop: "16px",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: "1px solid #E2E8F0",
                                    background: "#F5F7FA",
                                }, children: _jsx("img", { src: previewUrl, alt: "Preview", style: {
                                        width: "100%",
                                        maxHeight: "300px",
                                        objectFit: "contain",
                                        display: "block",
                                    } }) })), _jsxs("div", { style: { marginTop: "24px" }, children: [_jsx("h3", { style: {
                                            fontSize: "1rem",
                                            marginBottom: "8px",
                                            fontWeight: 600,
                                            color: "#1A1F36",
                                        }, children: "2. What does the problem look like?" }), _jsx("p", { style: {
                                            fontSize: "0.875rem",
                                            color: "#718096",
                                            marginBottom: "12px",
                                        }, children: "This helps the demo \"AI\" choose the right explanation overlay." }), _jsxs("select", { value: visualIssue, onChange: (e) => setVisualIssue(e.target.value), style: {
                                            width: "100%",
                                            padding: "12px 16px",
                                            borderRadius: "8px",
                                            border: "1px solid #E2E8F0",
                                            background: "#FFFFFF",
                                            color: "#1A1F36",
                                            fontSize: "0.9rem",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                        }, onFocus: (e) => {
                                            e.currentTarget.style.borderColor = "#0066CC";
                                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 102, 204, 0.1)";
                                        }, onBlur: (e) => {
                                            e.currentTarget.style.borderColor = "#E2E8F0";
                                            e.currentTarget.style.boxShadow = "none";
                                        }, children: [_jsx("option", { value: "THREAD_BREAKING", children: "Thread broken or missing in the seam" }), _jsx("option", { value: "SKIP_STITCH", children: "Skipped stitches along the seam" }), _jsx("option", { value: "BIRDS_NEST", children: "Bird's nest / thread bunching below" }), _jsx("option", { value: "NEEDLE_MARKS", children: "Needle marks / holes on fabric" }), _jsx("option", { value: "UNEVEN_STITCH", children: "Uneven stitch length / tension" })] })] }), _jsx("button", { onClick: runDemoAnalysis, disabled: !canRun || running, style: {
                                    marginTop: "20px",
                                    width: "100%",
                                    padding: "12px 24px",
                                    borderRadius: "8px",
                                    border: "none",
                                    background: !canRun || running ? "#CBD5E0" : "#0066CC",
                                    color: "white",
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    cursor: !canRun || running ? "not-allowed" : "pointer",
                                    transition: "all 0.2s ease",
                                }, onMouseEnter: (e) => {
                                    if (canRun && !running) {
                                        e.currentTarget.style.background = "#0052A3";
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }
                                }, onMouseLeave: (e) => {
                                    if (canRun && !running) {
                                        e.currentTarget.style.background = "#0066CC";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }
                                }, children: running
                                    ? "Analyzing image…"
                                    : canRun
                                        ? "Run AI Demo"
                                        : "Upload an image to start" }), _jsx("p", { style: {
                                    marginTop: "12px",
                                    fontSize: "0.8rem",
                                    color: "#718096",
                                }, children: "Demo only: in a real version, Zoje AI would analyze the pixels, detect stitch patterns, and map them to an internal problem library." })] }), _jsxs(Card, { style: { padding: "24px" }, children: [_jsx("h3", { style: {
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    marginBottom: "8px",
                                    color: "#1A1F36",
                                }, children: "3. AI Diagnosis Preview" }), _jsx("p", { style: {
                                    fontSize: "0.875rem",
                                    color: "#718096",
                                    marginBottom: "20px",
                                }, children: "Zoje AI will explain what it \"sees\" in the stitch image and guide the operator step by step." }), !analysis && (_jsx("div", { style: {
                                    padding: "32px",
                                    borderRadius: "12px",
                                    border: "2px dashed #E2E8F0",
                                    textAlign: "center",
                                    background: "#F5F7FA",
                                }, children: _jsxs("p", { style: { fontSize: "0.9rem", color: "#718096", margin: 0 }, children: ["Upload a photo on the left and click ", _jsx("strong", { children: "\"Run AI Demo\"" }), " to see a sample diagnosis."] }) })), analysis && (_jsxs("div", { style: {
                                    padding: "24px",
                                    borderRadius: "12px",
                                    border: "1px solid #B3D9FF",
                                    background: "#E6F2FF",
                                }, children: [_jsxs("div", { style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                            marginBottom: "16px",
                                        }, children: [_jsx("div", { style: {
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "10px",
                                                    background: "#0066CC",
                                                    color: "white",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "1rem",
                                                    fontWeight: 700,
                                                }, children: "AI" }), _jsx("div", { style: {
                                                    fontSize: "1.1rem",
                                                    fontWeight: 600,
                                                    color: "#1A1F36",
                                                }, children: analysis.title })] }), _jsx("p", { style: {
                                            marginBottom: "20px",
                                            lineHeight: 1.6,
                                            color: "#1A1F36",
                                            fontSize: "0.95rem",
                                        }, children: analysis.summary }), _jsxs("div", { style: { marginBottom: "20px" }, children: [_jsx("div", { style: {
                                                    fontSize: "0.9rem",
                                                    fontWeight: 600,
                                                    marginBottom: "12px",
                                                    color: "#1A1F36",
                                                }, children: "Probable causes Zoje AI would highlight:" }), _jsx("ul", { style: {
                                                    paddingLeft: "20px",
                                                    margin: 0,
                                                    listStyle: "disc",
                                                    fontSize: "0.9rem",
                                                    color: "#1A1F36",
                                                    lineHeight: 1.8,
                                                }, children: analysis.probableCauses.map((c, i) => (_jsx("li", { style: { marginBottom: "6px" }, children: c }, i))) })] }), _jsxs("div", { style: { marginBottom: "20px" }, children: [_jsx("div", { style: {
                                                    fontSize: "0.9rem",
                                                    fontWeight: 600,
                                                    marginBottom: "12px",
                                                    color: "#1A1F36",
                                                }, children: "Recommended checks for the operator:" }), _jsx("ol", { style: {
                                                    paddingLeft: "20px",
                                                    margin: 0,
                                                    fontSize: "0.9rem",
                                                    color: "#1A1F36",
                                                    lineHeight: 1.8,
                                                }, children: analysis.recommendedChecks.map((step, i) => (_jsx("li", { style: { marginBottom: "6px" }, children: step }, i))) })] }), _jsx("div", { style: {
                                            marginTop: "16px",
                                            paddingTop: "16px",
                                            borderTop: "1px solid #B3D9FF",
                                            fontSize: "0.85rem",
                                            color: "#4A5568",
                                            fontStyle: "italic",
                                        }, children: analysis.note })] }))] })] })] }));
}
// Local "fake AI" logic for demo
function buildDemoAnalysis(issue) {
    switch (issue) {
        case "THREAD_BREAKING":
            return {
                title: "Detected pattern: frequent thread breakage in the seam",
                summary: "From this type of image, Zoje AI would focus on the needle area, thread path, and tension points. The pattern of broken or missing top thread suggests instability in thread path or tension, especially at higher speeds.",
                probableCauses: [
                    "Top thread tension too high or passing through a sharp edge",
                    "Needle size too small for the fabric/thread combination",
                    "Burr or damage on needle eye, hook, or needle plate",
                    "Poor quality or old thread becoming weak under tension",
                ],
                recommendedChecks: [
                    "Rethread the machine completely, making sure the thread is seated correctly in each tension disk and guide.",
                    "Replace the needle with a fresh one of the correct size for this fabric and thread.",
                    "Run your finger (carefully) along the needle plate and hook area to feel for burrs; if found, replace or polish.",
                    "Lower the top tension slightly and test on a scrap piece at different speeds.",
                ],
                note: "In a live version, Zoje AI could highlight the exact region where the thread is failing and overlay arrows or circles on the image to show where to check first.",
            };
        case "SKIP_STITCH":
            return {
                title: "Detected pattern: skipped stitches along the seam line",
                summary: "The spacing of missing stitches suggests a hook–needle timing or needle penetration issue. Zoje AI would analyze the seam line and look for gaps in the top thread pattern.",
                probableCauses: [
                    "Hook–needle timing slightly out of adjustment",
                    "Incorrect needle type or size for this fabric (especially on stretch / down jacket fabrics)",
                    "Fabric not held flat, causing deflection of the needle at certain points",
                    "Old or bent needle not forming a consistent loop for the hook to catch",
                ],
                recommendedChecks: [
                    "Install a new, correct needle type (e.g., ballpoint for knits, correct size for down jackets).",
                    "Check that the seam is feeding flat and the presser foot pressure is appropriate.",
                    "Sew slowly on test fabric and visually check if the loop formation is consistent.",
                    "If skipping continues in the same spot, schedule a technician to inspect hook–needle timing.",
                ],
                note: "In a live system, Zoje AI could overlay a heat map along the seam, showing where skipped stitches are concentrated and linking to timing adjustment guides.",
            };
        case "BIRDS_NEST":
            return {
                title: "Detected pattern: bird's nest / thread bunching under the fabric",
                summary: "The cluster of thread on the underside indicates poor top thread control or incorrect threading. Zoje AI would focus on the bobbin area and top thread path in this region.",
                probableCauses: [
                    "Top thread not properly placed in tension discs, effectively sewing with no tension",
                    "Bobbin inserted incorrectly or bobbin tension too loose",
                    "Starting seam without holding top and bobbin threads for first few stitches",
                    "Dust or lint build-up in the bobbin case affecting smooth tension release",
                ],
                recommendedChecks: [
                    "Rethread the top thread carefully, making sure it is between the tension discs.",
                    "Remove bobbin, clean bobbin case, and reinsert bobbin in the correct direction.",
                    "Hold the thread tails gently for the first 3–5 stitches when starting a seam.",
                    "Test on scrap fabric and observe if the underside thread pattern stabilizes.",
                ],
                note: "A production version could mark the underside area in red and show a short animation of correct threading and bobbin insertion specific to your machine model.",
            };
        case "NEEDLE_MARKS":
            return {
                title: "Detected pattern: visible needle marks / holes on the fabric",
                summary: "The distinct perforation marks around the seam suggest a mismatch between needle, fabric, and thread. Zoje AI would emphasize needle type recognition and fabric classification.",
                probableCauses: [
                    "Needle tip too sharp or large for this delicate fabric",
                    "Using regular needle on knit/stretch where ballpoint is needed",
                    "Excessive presser foot pressure causing the needle to force the fabric",
                    "Wrong thread type (too thick or too coarse surface) cutting into fibers",
                ],
                recommendedChecks: [
                    "Switch to a finer needle size suitable for the fabric (e.g., No. 9 or 11 for delicate fabrics).",
                    "For knits, use a ballpoint (SES/SUK) needle instead of a sharp point.",
                    "Reduce presser foot pressure and test again on scrap.",
                    "If marks remain even with correct needle, consider a softer thread type.",
                ],
                note: "Visual AI could auto-classify the fabric (woven vs knit) and suggest the recommended needle system and size for that specific combination.",
            };
        case "UNEVEN_STITCH":
        default:
            return {
                title: "Detected pattern: uneven stitch length or tension imbalance",
                summary: "The variation in stitch length and tension indicates inconsistent feeding or unbalanced tensions. Zoje AI would closely inspect the stitch line profile and the pull on top vs bottom thread.",
                probableCauses: [
                    "Feed dog or presser foot not applying even pressure (worn, dirty, or misadjusted)",
                    "Top and bobbin tensions not balanced for this fabric and thread",
                    "Operator pulling or pushing the fabric, fighting the feed system",
                    "Residual oil, dust, or lint causing micro-slips in the feed path",
                ],
                recommendedChecks: [
                    "Clean the feed dog and presser foot; check for wear or damage.",
                    "Reset thread tensions to a neutral baseline, then fine-tune both top and bobbin.",
                    "Ask operator to let the machine feed the fabric without pulling/pushing.",
                    "Test with a standard reference fabric to confirm machine's base behavior.",
                ],
                note: "In a real version, Zoje AI could generate a before/after comparison on screen to show how stitch balance improves after tension corrections.",
            };
    }
}
//# sourceMappingURL=ImageDiagnosisDemoPage.js.map