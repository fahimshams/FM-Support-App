// src/pages/ImageDiagnosisDemoPage.tsx
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type VisualIssueType =
  | "THREAD_BREAKING"
  | "SKIP_STITCH"
  | "BIRDS_NEST"
  | "NEEDLE_MARKS"
  | "UNEVEN_STITCH";

type DemoAnalysis = {
  title: string;
  summary: string;
  probableCauses: string[];
  recommendedChecks: string[];
  note: string;
};

export default function ImageDiagnosisDemoPage() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [visualIssue, setVisualIssue] = useState<VisualIssueType>("THREAD_BREAKING");
  const [analysis, setAnalysis] = useState<DemoAnalysis | null>(null);
  const [running, setRunning] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setAnalysis(null);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  function runDemoAnalysis() {
    setRunning(true);
    setAnalysis(null);

    // Simulate AI thinking for demo
    setTimeout(() => {
      const result = buildDemoAnalysis(visualIssue);
      setAnalysis(result);
      setRunning(false);
    }, 600);
  }

  const canRun = !!selectedFile;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.3rem", marginBottom: 4 }}>
            AI Image Diagnosis (Demo)
          </h2>
          <p
            style={{
              fontSize: "0.85rem",
              opacity: 0.75,
              maxWidth: 480,
            }}
          >
            Upload a clear photo of the sewing problem (stitches, needle, or feed area). 
            FM AI will simulate how it could highlight likely causes & checks—this is a
            demo only, no real image processing yet.
          </p>
        </div>

        <button
          onClick={() => navigate("/ticket")}
          style={{
            alignSelf: "flex-start",
            padding: "6px 12px",
            borderRadius: "999px",
            border: "1px solid #374151",
            background: "#020617",
            color: "white",
            fontSize: "0.8rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          ← Back to Report Issue
        </button>
      </div>

      {/* Main layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
          gap: 18,
        }}
      >
        {/* Left: upload + options */}
        <section
          style={{
            padding: 16,
            borderRadius: 16,
            border: "1px solid #1f2937",
            background: "rgba(15,23,42,0.95)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
          }}
        >
          <h3
            style={{
              fontSize: "0.95rem",
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            1. Upload a photo of the problem
          </h3>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              borderRadius: 12,
              border: "1px dashed #374151",
              padding: "18px 12px",
              cursor: "pointer",
              background:
                "radial-gradient(circle at 10% 0%, rgba(34,197,94,0.08), transparent 60%)",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "999px",
                border: "1px solid #22c55e33",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              📷
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              Click to upload image
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                opacity: 0.75,
              }}
            >
              Close-up of stitches, needle area, or feed dog is best.
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>

          {selectedFile && (
            <div
              style={{
                marginTop: 12,
                fontSize: "0.75rem",
                opacity: 0.8,
              }}
            >
              Selected file: <strong>{selectedFile.name}</strong>
            </div>
          )}

          {previewUrl && (
            <div
              style={{
                marginTop: 14,
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #1f2937",
                background: "#020617",
              }}
            >
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: 260,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* Visual issue selection */}
          <div style={{ marginTop: 18 }}>
            <h3
              style={{
                fontSize: "0.95rem",
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              2. What does the problem look like?
            </h3>
            <p
              style={{
                fontSize: "0.75rem",
                opacity: 0.75,
                marginBottom: 8,
              }}
            >
              This helps the demo “AI” choose the right explanation overlay.
            </p>

            <select
              value={visualIssue}
              onChange={(e) => setVisualIssue(e.target.value as VisualIssueType)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 10,
                border: "1px solid #374151",
                background: "#020617",
                color: "white",
                fontSize: "0.85rem",
              }}
            >
              <option value="THREAD_BREAKING">
                Thread broken or missing in the seam
              </option>
              <option value="SKIP_STITCH">Skipped stitches along the seam</option>
              <option value="BIRDS_NEST">Bird’s nest / thread bunching below</option>
              <option value="NEEDLE_MARKS">Needle marks / holes on fabric</option>
              <option value="UNEVEN_STITCH">Uneven stitch length / tension</option>
            </select>
          </div>

          {/* Run demo button */}
          <button
            onClick={runDemoAnalysis}
            disabled={!canRun || running}
            style={{
              marginTop: 16,
              padding: "8px 16px",
              borderRadius: 999,
              border: "none",
              background: !canRun
                ? "#4b5563"
                : running
                ? "#16a34a99"
                : "#22c55e",
              color: "black",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: !canRun || running ? "default" : "pointer",
              opacity: !canRun ? 0.6 : 1,
            }}
          >
            {running
              ? "Analyzing image…"
              : canRun
              ? "Run AI Demo"
              : "Upload an image to start"}
          </button>

          <p
            style={{
              marginTop: 8,
              fontSize: "0.7rem",
              opacity: 0.65,
            }}
          >
            Demo only: in a real version, FM AI would analyze the pixels, detect
            stitch patterns, and map them to an internal problem library.
          </p>
        </section>

        {/* Right: AI demo output */}
        <section
          style={{
            padding: 16,
            borderRadius: 16,
            border: "1px solid #1f2937",
            background: "rgba(15,23,42,0.95)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            3. AI Diagnosis Preview
          </h3>
          <p
            style={{
              fontSize: "0.75rem",
              opacity: 0.75,
              marginBottom: 6,
            }}
          >
            FM AI will explain what it “sees” in the
            stitch image and guide the operator step by step.
          </p>

          {!analysis && (
            <div
              style={{
                marginTop: 8,
                padding: 14,
                borderRadius: 12,
                border: "1px dashed #374151",
                fontSize: "0.8rem",
                opacity: 0.8,
                color: "#9ca3af",
              }}
            >
              Upload a photo on the left and click{" "}
              <strong>“Run AI Demo”</strong> to see a sample diagnosis.
            </div>
          )}

          {analysis && (
            <div
              style={{
                marginTop: 6,
                padding: 14,
                borderRadius: 12,
                border: "1px solid #374151",
                background:
                  "radial-gradient(circle at 0% 0%, rgba(34,197,94,0.12), #020617)",
                fontSize: "0.8rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                {analysis.title}
              </div>
              <p
                style={{
                  marginBottom: 8,
                  lineHeight: 1.5,
                }}
              >
                {analysis.summary}
              </p>

              <div style={{ marginBottom: 6 }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Probable causes FM AI would highlight:
                </div>
                <ul
                  style={{
                    paddingLeft: 18,
                    margin: 0,
                    listStyle: "disc",
                  }}
                >
                  {analysis.probableCauses.map((c, i) => (
                    <li key={i} style={{ marginBottom: 2 }}>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: 6 }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Recommended checks for the operator:
                </div>
                <ol
                  style={{
                    paddingLeft: 18,
                    margin: 0,
                  }}
                >
                  {analysis.recommendedChecks.map((step, i) => (
                    <li key={i} style={{ marginBottom: 2 }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div
                style={{
                  marginTop: 6,
                  fontSize: "0.75rem",
                  opacity: 0.75,
                }}
              >
                {analysis.note}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// Local "fake AI" logic for demo
function buildDemoAnalysis(issue: VisualIssueType): DemoAnalysis {
  switch (issue) {
    case "THREAD_BREAKING":
      return {
        title: "Detected pattern: frequent thread breakage in the seam",
        summary:
          "From this type of image, FM AI would focus on the needle area, thread path, and tension points. The pattern of broken or missing top thread suggests instability in thread path or tension, especially at higher speeds.",
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
        note:
          "In a live version, FM AI could highlight the exact region where the thread is failing and overlay arrows or circles on the image to show where to check first.",
      };

    case "SKIP_STITCH":
      return {
        title: "Detected pattern: skipped stitches along the seam line",
        summary:
          "The spacing of missing stitches suggests a hook–needle timing or needle penetration issue. FM AI would analyze the seam line and look for gaps in the top thread pattern.",
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
        note:
          "In a live system, FM AI could overlay a heat map along the seam, showing where skipped stitches are concentrated and linking to timing adjustment guides.",
      };

    case "BIRDS_NEST":
      return {
        title: "Detected pattern: bird’s nest / thread bunching under the fabric",
        summary:
          "The cluster of thread on the underside indicates poor top thread control or incorrect threading. FM AI would focus on the bobbin area and top thread path in this region.",
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
        note:
          "A production version could mark the underside area in red and show a short animation of correct threading and bobbin insertion specific to your machine model.",
      };

    case "NEEDLE_MARKS":
      return {
        title: "Detected pattern: visible needle marks / holes on the fabric",
        summary:
          "The distinct perforation marks around the seam suggest a mismatch between needle, fabric, and thread. FM AI would emphasize needle type recognition and fabric classification.",
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
        note:
          "Visual AI could auto-classify the fabric (woven vs knit) and suggest the recommended needle system and size for that specific combination.",
      };

    case "UNEVEN_STITCH":
    default:
      return {
        title: "Detected pattern: uneven stitch length or tension imbalance",
        summary:
          "The variation in stitch length and tension indicates inconsistent feeding or unbalanced tensions. FM AI would closely inspect the stitch line profile and the pull on top vs bottom thread.",
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
          "Test with a standard reference fabric to confirm machine’s base behavior.",
        ],
        note:
          "In a real version, FM AI could generate a before/after comparison on screen to show how stitch balance improves after tension corrections.",
      };
  }
}
