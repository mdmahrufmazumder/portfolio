import { useState, type ChangeEvent } from 'react';
import { Check, Cpu, ExternalLink, Github, ImagePlus, Pencil, Plus, Trash2, X } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import { readFileAsDataUrl } from '../utils/storage';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onUpdateProjects: (projects: ProjectItem[]) => void;
}

export function ProjectsSection({ projects, onUpdateProjects }: ProjectsSectionProps) {
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const openNewProject = () => {
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: '',
      classification: 'Academic / Technical Project',
      description: '',
      technologies: [],
      imageUrl: '',
      githubUrl: '',
      demoUrl: ''
    });
    setTechInput('');
    setIsNew(true);
  };

  const openEditProject = (proj: ProjectItem) => {
    setEditingProject({ ...proj });
    setTechInput(proj.technologies.join(', '));
    setIsNew(false);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setEditingProject({ ...editingProject, imageUrl: dataUrl });
    } catch {
      // Ignore read errors
    }
    e.target.value = '';
  };

  const handleSave = () => {
    if (!editingProject || !editingProject.title.trim()) return;
    const technologies = techInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedProject: ProjectItem = {
      ...editingProject,
      technologies
    };

    if (isNew) {
      onUpdateProjects([...projects, updatedProject]);
    } else {
      onUpdateProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    }
    setEditingProject(null);
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
              <Cpu className="h-4 w-4" />
              <span>Applied Engineering &amp; Prototyping</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Projects
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Practical implementations combining embedded hardware integration, sensor calibration, and software usability.
            </p>
          </div>

          <button
            type="button"
            onClick={openNewProject}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0D1320] px-4 py-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 hover:border-cyan-500 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Future Project</span>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((proj) => {
            const hasImage = Boolean(proj.imageUrl) && !failedImages[proj.id];
            return (
              <article
                key={proj.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#070A11]">
                  {hasImage ? (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [proj.id]: true }))
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                      <Cpu className="h-8 w-8 text-slate-400 dark:text-slate-600" />
                      <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                        {proj.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-mono text-cyan-700 dark:text-cyan-400">
                        {proj.classification}
                      </p>
                      <button
                        type="button"
                        onClick={() => openEditProject(proj)}
                        className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer shrink-0"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>

                    <h3 className="mt-2 font-display text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {proj.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                      {proj.description}
                    </p>

                    {proj.highlights && proj.highlights.length > 0 && (
                      <ul className="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                        {proj.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span aria-hidden="true" className="text-cyan-600 dark:text-cyan-400 mt-0.5">–</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {proj.technologies.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/70 text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">Stack &amp; Hardware: </span>
                        {proj.technologies.join(' · ')}
                      </div>
                    )}
                  </div>

                  {/* Editable Links */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {proj.githubUrl ? (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-100 hover:border-cyan-500 transition-colors"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub Repository</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openEditProject(proj)}
                        className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>Add GitHub Link</span>
                      </button>
                    )}

                    {proj.demoUrl ? (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[38px] items-center gap-2 rounded-lg bg-slate-900 dark:bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-cyan-400 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Live Demo / Docs</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openEditProject(proj)}
                        className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Add Demo Link</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      {editingProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto"
        >
          <div className="my-8 w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 id="project-modal-title" className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                {isNew ? 'Add New Project' : 'Edit Project'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                aria-label="Close modal"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="mt-5 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Classification / Version
                  </label>
                  <input
                    type="text"
                    value={editingProject.classification}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, classification: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Technologies / Hardware (comma-separated)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Arduino Nano, QTR-8RC Sensor Array, TB6612FNG Motor Driver"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Demo / Documentation URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editingProject.demoUrl}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, demoUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Project Image
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500 cursor-pointer">
                    <ImagePlus className="h-4 w-4" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {editingProject.imageUrl && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Image attached
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                {!isNew && (
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateProjects(projects.filter((p) => p.id !== editingProject.id));
                      setEditingProject(null);
                    }}
                    className="mr-auto inline-flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete Project</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 dark:bg-cyan-500 px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
