"use client";

import { useState } from "react";

type ResumeTemplate = "classic" | "modern" | "creative" | "professional" | "minimal" | "executive";

type Props = {
  id: string;
  name: string;
  title: string;
  summary: string;
  skills: string[];
  experience: any[];
  template?: ResumeTemplate;
  onClose: () => void;
};

const templateVisuals: Record<ResumeTemplate, { label: string; cardBg: string; border: string; accent: string; sectionBg: string; text: string }> = {
  classic: {
    label: "Classic",
    cardBg: "#0f172a",
    border: "#334155",
    accent: "#0ea5e9",
    sectionBg: "#111827",
    text: "#e2e8f0",
  },
  modern: {
    label: "Modern",
    cardBg: "#f8fafc",
    border: "#cbd5e1",
    accent: "#0f172a",
    sectionBg: "#ffffff",
    text: "#0f172a",
  },
  creative: {
    label: "Creative",
    cardBg: "#0f172a",
    border: "#475569",
    accent: "#fb7185",
    sectionBg: "#111827",
    text: "#f8fafc",
  },
  professional: {
    label: "Professional",
    cardBg: "#f8fafc",
    border: "#cbd5e1",
    accent: "#047857",
    sectionBg: "#ffffff",
    text: "#0f172a",
  },
  minimal: {
    label: "Minimal",
    cardBg: "#ffffff",
    border: "#e2e8f0",
    accent: "#64748b",
    sectionBg: "#f8fafc",
    text: "#0f172a",
  },
  executive: {
    label: "Executive",
    cardBg: "#0f172a",
    border: "#334155",
    accent: "#f59e0b",
    sectionBg: "#111827",
    text: "#f8fafc",
  },
};

const templateDocxStyles: Record<ResumeTemplate, { heading: string; accent: string; body: string; sectionFill: string }> = {
  classic: { heading: "0F172A", accent: "0EA5E9", body: "CBD5E1", sectionFill: "1E293B" },
  modern: { heading: "0F172A", accent: "0F172A", body: "475569", sectionFill: "F8FAFC" },
  creative: { heading: "F8FAFC", accent: "FB7185", body: "E2E8F0", sectionFill: "0F172A" },
  professional: { heading: "0F172A", accent: "047857", body: "334155", sectionFill: "F8FAFC" },
  minimal: { heading: "0F172A", accent: "64748B", body: "334155", sectionFill: "F8FAFC" },
  executive: { heading: "F8FAFC", accent: "F59E0B", body: "E2E8F0", sectionFill: "0F172A" },
};

export default function ExportModal({ id, name, title, summary, skills, experience, template, onClose }: Props) {
  const selectedTemplate = template ?? "classic";
  const [selectedFormat, setSelectedFormat] = useState<"docx" | "pdf">("docx");
  const selectedVisual = templateVisuals[selectedTemplate];
  const selectedDocxStyle = templateDocxStyles[selectedTemplate];

  const generateDocx = async () => {
    // docx library required: npm i docx
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, ShadingType } = await import("docx");
    const children: any[] = [];

    children.push(
      new Paragraph({
        text: name,
        heading: HeadingLevel.HEADING_1,
        thematicBreak: false,
        spacing: { after: 200 },
        style: "heading1",
      })
    );
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: title, italics: true, size: 24, color: selectedDocxStyle.accent }),
        ],
        spacing: { after: 100 },
      })
    );
    children.push(
      new Paragraph({
        text: "Summary",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        style: "sectionLabel",
      })
    );
    children.push(
      new Paragraph({
        style: "bodyText",
        spacing: { after: 200 },
        children: [new TextRun({ text: summary, color: selectedDocxStyle.body, size: 24 })],
      })
    );
    children.push(
      new Paragraph({
        text: "Skills",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        style: "sectionLabel",
      })
    );
    skills.forEach((skill) => {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          style: "bodyText",
          spacing: { after: 100 },
          children: [new TextRun({ text: skill, color: selectedDocxStyle.body, size: 24 })],
        })
      );
    });
    children.push(
      new Paragraph({
        text: "Experience",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 250, after: 120 },
        style: "sectionLabel",
      })
    );
    experience.forEach((e) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${e.role}`, bold: true, color: selectedDocxStyle.accent }),
            new TextRun({ text: ` — ${e.company}`, color: selectedDocxStyle.body }),
          ],
          spacing: { after: 40 },
        })
      );
      children.push(
        new Paragraph({
          children: [new TextRun({ text: e.dates, italics: true, size: 18, color: selectedDocxStyle.body })],
          spacing: { after: 40 },
        })
      );
      children.push(
        new Paragraph({
          children: [new TextRun({ text: e.description, color: selectedDocxStyle.body })],
          spacing: { after: 200 },
        })
      );
    });

    const doc = new Document({
      sections: [
        {
          properties: {
            page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } },
          },
          children,
        },
      ],
      styles: {
        paragraphStyles: [
          {
            id: "heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              bold: true,
              size: 52,
              color: selectedDocxStyle.heading,
            },
          },
          {
            id: "heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              bold: true,
              size: 32,
              color: selectedDocxStyle.accent,
            },
          },
              {
            id: "sectionLabel",
            name: "Section Label",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              bold: true,
              size: 18,
              color: selectedDocxStyle.accent,
            },
            paragraph: {
              shading: {
                type: ShadingType.CLEAR,
                fill: selectedDocxStyle.sectionFill,
              },
            },
          },
          {
            id: "bodyText",
            name: "Body Text",
            basedOn: "Normal",
            next: "Normal",
            run: {
              size: 24,
              color: selectedDocxStyle.body,
            },
          },
        ],
      },
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob as Blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}-${template}-resume.docx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    onClose();
  };

  const generatePdf = async () => {
    // html2canvas + jspdf required: npm i html2canvas jspdf
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const container = document.createElement("div");
    container.style.width = "794px"; /* A4 width at 96dpi */
    container.style.padding = "0";
    container.style.background = "#ffffff";
    container.style.boxSizing = "border-box";
    container.style.position = "fixed";
    container.style.left = "-9999px";
    const visual = selectedVisual;
    container.innerHTML = `
      <div style="width: 794px; padding: 40px; font-family: Arial, sans-serif; color: ${visual.text}; background: ${visual.cardBg}; box-sizing: border-box;">
        <div style="border-bottom: 1px solid ${visual.border}; padding-bottom: 14px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="margin: 0; font-size: 32px; line-height: 1.1; color: ${visual.text};">${name}</h1>
            <p style="margin: 8px 0 0; font-size: 16px; color: ${visual.text}; opacity: 0.8;">${title}</p>
          </div>
          <div style="text-align: right; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: ${visual.accent};">${visual.label} layout</div>
        </div>

        <div style="margin-bottom: 24px;">
          <p style="margin: 0; font-size: 14px; line-height: 1.8; color: ${visual.text}; opacity: 0.86;">${summary}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 24px;">
          <div style="padding: 18px; border: 1px solid ${visual.border}; border-radius: 14px; background: ${visual.sectionBg};">
            <h2 style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: ${visual.accent};">Skills</h2>
            <p style="margin: 0; font-size: 13px; line-height: 1.8; color: ${visual.text};">${skills.join(", ")}</p>
          </div>
          <div style="padding: 18px; border: 1px solid ${visual.border}; border-radius: 14px; background: ${visual.sectionBg};">
            <h2 style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: ${visual.accent};">Template</h2>
            <p style="margin: 0; font-size: 13px; line-height: 1.8; color: ${visual.text};">${visual.label} design</p>
          </div>
        </div>

        <div>
          <h2 style="margin: 0 0 16px; font-size: 14px; letter-spacing: 0.18em; text-transform: uppercase; color: ${visual.accent};">Experience</h2>
          ${experience
            .map(
              (e) => `
            <div style="margin-bottom: 16px; padding: 18px; border: 1px solid ${visual.border}; border-radius: 14px; background: ${visual.sectionBg};">
              <div style="display: flex; justify-content: space-between; gap: 16px; align-items: baseline;">
                <p style="margin: 0; font-size: 14px; font-weight: 700; color: ${visual.text};">${e.role} — ${e.company}</p>
                <p style="margin: 0; font-size: 12px; color: ${visual.text}; opacity: 0.7;">${e.dates}</p>
              </div>
              <p style="margin: 10px 0 0; font-size: 13px; line-height: 1.8; color: ${visual.text}; opacity: 0.86;">${e.description}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
    document.body.appendChild(container);

    const canvas = await html2canvas(container as HTMLElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "px", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;
    pdf.addImage(imgData, "PNG", (pdfWidth - imgWidth) / 2, 20, imgWidth, imgHeight);
    pdf.save(`${id}-${template}-resume.pdf`);

    container.remove();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/40">
      <div className="flex min-h-full items-center justify-center px-4 py-6">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">Export resume</h3>
            <p className="mt-2 text-sm text-slate-600">Preview this sample resume before downloading in PDF or DOCX format.</p>
          </div>
          <button onClick={onClose} className="rounded-md px-3 py-2 text-sm text-slate-500 hover:bg-slate-100">Close</button>
        </div>

        <div className="mt-5 rounded-3xl border border-slate-200/80 bg-slate-50 p-5 text-slate-900 shadow-sm">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Choose export type</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">Preview before download</h3>
              <p className="mt-2 text-sm text-slate-600">Select DOCX or PDF and see a sample of the resume file before downloading.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {(["docx", "pdf"] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    selectedFormat === format
                      ? format === "docx"
                        ? "border-sky-500 bg-sky-600 text-white"
                        : "border-rose-500 bg-rose-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {format === "docx" ? "DOCX preview" : "PDF preview"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-slate-200/80 bg-white p-5 text-slate-900 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{selectedFormat.toUpperCase()} sample</p>
              <h4 className="text-lg font-semibold text-slate-900">{template.charAt(0).toUpperCase() + template.slice(1)} resume design</h4>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {selectedFormat === "docx" ? "Word file" : "PDF file"}
            </span>
          </div>

          <div
            className="mt-4 rounded-[28px] border p-5 shadow-sm"
            style={{ borderColor: selectedVisual.border, backgroundColor: selectedVisual.cardBg }}
          >
            <div
              className="rounded-2xl border p-5"
              style={{ borderColor: selectedVisual.border, backgroundColor: selectedVisual.sectionBg }}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em]" style={{ color: selectedVisual.accent }}>
                    {selectedFormat.toUpperCase()} layout
                  </p>
                  <h5 className="text-lg font-semibold" style={{ color: selectedVisual.text }}>{name}</h5>
                  <p className="text-sm" style={{ color: selectedVisual.text, opacity: 0.75 }}>{title}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em]" style={{ color: selectedVisual.accent }}>
                    Summary
                  </p>
                  <p className="mt-2 text-sm leading-6" style={{ color: selectedVisual.text }}>{summary}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em]" style={{ color: selectedVisual.accent }}>
                    Skills
                  </p>
                  <p className="mt-2 text-sm leading-6" style={{ color: selectedVisual.text }}>{skills.join(", ")}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em]" style={{ color: selectedVisual.accent }}>
                    Experience
                  </p>
                  <div className="mt-3 space-y-3">
                    {experience.map((exp) => (
                      <div
                        key={exp.id}
                        className="rounded-2xl p-3 border"
                        style={{ borderColor: selectedVisual.border, backgroundColor: selectedVisual.cardBg }}
                      >
                        <p className="text-sm font-semibold" style={{ color: selectedVisual.text }}>
                          {exp.role} — {exp.company}
                        </p>
                        <p className="text-xs uppercase tracking-[0.16em]" style={{ color: selectedVisual.text, opacity: 0.7 }}>
                          {exp.dates}
                        </p>
                        <p className="mt-2 text-sm leading-6" style={{ color: selectedVisual.text }}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            onClick={selectedFormat === "docx" ? generateDocx : generatePdf}
            className={`rounded-xl px-4 py-3 text-sm font-semibold text-white ${
              selectedFormat === "docx" ? "bg-sky-600 hover:bg-sky-500" : "bg-rose-600 hover:bg-rose-500"
            }`}
          >
            Download {selectedFormat.toUpperCase()}
          </button>
          <button onClick={onClose} className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200">
            Cancel
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
