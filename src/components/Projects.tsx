import React, { useState } from "react";
import { motion } from "framer-motion";
// import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartImage from "../assets/cart.jpg";
import TaskImage from "../assets/task-management.jpg";
import { toast, ToastContainer } from "react-toastify";

type Data = {
  id: string;
  image_url: string;
  title: string;
  description: string;
  technologies: string[];
  live_url: string;
  github_url: string;
  featured: boolean;
};

export default function Projects() {

  
  const projects = [
    {
      id: "2",
      image_url: CartImage,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. Built with React, Node.js, and PostgreSQL",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      live_url: "",
      github_url: "",
      featured: true,
    },
    {
      id: "1",
      image_url: TaskImage,
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates, team workspaces, and deadline tracking. Features drag-and-drop interface and notifications.",
      technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
      live_url: "",
      github_url: "",
      featured: true,
    },
  ];

  // const [projects] = useState(data);
  const [isLoading] = useState(false);
  // const { data: projects, isLoading } = useQuery({
  //   queryKey: ['projects'],
  //   // queryFn: () => base44.entities.Project.list('-order'),
  //   initialData: [],
  // });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  // console.log(projects.map((p )=> p.projects.map()))
  return (
    <section id="projects" className="py-20 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent work and side projects
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Github className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-slate-400 text-lg mb-4">No projects yet</p>
            <p className="text-slate-500">Projects will be added soon!</p>
          </motion.div>
        ) : (
          <>
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {featuredProjects.map((project: Data, index: number) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                  >
                    {project.image_url && (
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent" />
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-blue-300 rounded-full border border-slate-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-3">
                        {project.live_url && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                            onClick={() =>
                              window.open(project.live_url, "_blank")
                            }
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        )}
                        {project.github_url && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 hover:border-blue-500 hover:text-blue-500"  
                            onClick={() => {
                              window.open(project.github_url, "_blank")
                            }}
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {otherProjects.map((project: Data, index: number) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
