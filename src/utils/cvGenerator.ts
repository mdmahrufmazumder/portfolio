import type { PortfolioData } from '../types/portfolio';

export async function downloadPortfolioCvPdf(data: PortfolioData): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 48;
  const maxLineWidth = pageWidth - marginX * 2;
  let y = 52;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - 48) {
      doc.addPage();
      y = 48;
    }
  };

  const addSectionHeading = (title: string) => {
    ensureSpace(34);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(14, 116, 144);
    doc.text(title.toUpperCase(), marginX, y);
    y += 5;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.75);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 14;
  };

  const addWrappedText = (text: string, fontSize = 9.5, isBold = false, color: [number, number, number] = [30, 41, 59], lineHeight = 13.5) => {
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxLineWidth) as string[];
    ensureSpace(lines.length * lineHeight + 4);
    doc.text(lines, marginX, y);
    y += lines.length * lineHeight;
  };

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text(data.personal.name, marginX, y);
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(51, 65, 85);
  doc.text(data.personal.headline, marginX, y);
  y += 15;

  const contactItems = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    `ORCID: ${data.personal.orcidId}`
  ].filter(Boolean);
  doc.setFontSize(8.8);
  doc.setTextColor(71, 85, 105);
  doc.text(contactItems.join('  |  '), marginX, y);
  y += 10;

  // Profile Summary
  addSectionHeading('Research Profile');
  addWrappedText(data.personal.intro);
  y += 4;

  // Education
  addSectionHeading('Education');
  data.education.forEach((edu) => {
    ensureSpace(36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.institution, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const rightText = [edu.period, edu.gpa].filter(Boolean).join(' · ');
    doc.text(rightText, pageWidth - marginX, y, { align: 'right' });
    y += 13;

    const degreeLine = edu.expectedGraduation
      ? `${edu.degree} (${edu.expectedGraduation})`
      : edu.degree;
    addWrappedText(degreeLine, 9.2, false, [51, 65, 85], 12.5);
    y += 5;
  });

  // Research Interests & Ongoing Topics
  addSectionHeading('Research Interests & Ongoing Topics');
  addWrappedText(
    `Primary Research Interests: ${data.researchInterests.map((r) => r.title).join(', ')}.`,
    9.2,
    false,
    [30, 41, 59],
    13
  );
  y += 4;
  addWrappedText(
    `Ongoing Research Topics: ${data.ongoingResearch.map((o) => o.title).join(', ')}.`,
    9.2,
    false,
    [30, 41, 59],
    13
  );
  y += 4;

  // Projects
  addSectionHeading('Selected Engineering & Technical Projects');
  data.projects.forEach((proj) => {
    ensureSpace(38);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${proj.title} — ${proj.classification}`, marginX, y);
    y += 13;
    addWrappedText(proj.description, 9.2, false, [51, 65, 85], 12.5);
    if (proj.technologies.length > 0) {
      addWrappedText(`Technologies: ${proj.technologies.join(', ')}`, 8.8, false, [71, 85, 105], 12);
    }
    y += 5;
  });

  // Leadership
  addSectionHeading('Leadership & Extracurricular Activities');
  data.leadership.forEach((item) => {
    ensureSpace(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${item.role} — ${item.organization}`, marginX, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(71, 85, 105);
    doc.text(item.period, pageWidth - marginX, y, { align: 'right' });
    y += 12.5;
    addWrappedText(item.focus, 9, false, [51, 65, 85], 12);
    y += 4;
  });

  // Skills
  addSectionHeading('Skills');
  data.skills
    .filter((cat) => cat.skills.length > 0)
    .forEach((cat) => {
      addWrappedText(`${cat.name}: ${cat.skills.join(', ')}`, 9.2, false, [30, 41, 59], 12.5);
      y += 2;
    });

  // Achievements
  addSectionHeading('Honors & Awards');
  data.achievements.forEach((ach) => {
    addWrappedText(`• ${ach.title} (${ach.year})`, 9.2, false, [30, 41, 59], 13);
  });
  y += 4;

  // Certifications
  addSectionHeading('Certifications & Research Training');
  data.certificates.forEach((cert) => {
    const meta = [cert.issuer, cert.completedDate, cert.presentedBy ? `Presented by: ${cert.presentedBy}` : '', cert.signedBy ? `Signed by: ${cert.signedBy}` : '']
      .filter(Boolean)
      .join(' · ');
    addWrappedText(`• ${cert.title} — ${meta}`, 9, false, [30, 41, 59], 12.5);
    y += 2;
  });

  // Languages
  addSectionHeading('Language Proficiency');
  data.languages.forEach((lang) => {
    const details = [lang.proficiency, lang.certification, lang.date].filter(Boolean).join(' · ');
    addWrappedText(`• ${lang.language}: ${details}`, 9.2, false, [30, 41, 59], 13);
  });

  const safeName = data.personal.name.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  doc.save(`${safeName || 'Academic'}_CV.pdf`);
}
