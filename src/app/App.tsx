import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Server,
  Sparkles,
  X,
} from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

const NAV_ITEMS = ["Sobre", "Projetos", "Habilidades", "Trajetória", "Contato"];

const PROJECTS = [
  {
    name: "DataFlow Pipeline",
    description:
      "Pipeline de ingestão e transformação de dados em tempo real, processando mais de 2 milhões de eventos diários com Apache Kafka e PySpark.",
    tags: ["Python", "Kafka", "PySpark", "AWS"],
    year: "2024",
    status: "Produção",
    accent: "from-emerald-400 to-cyan-300",
  },
  {
    name: "Panini Analytics",
    description:
      "Plataforma de BI self-service com dashboards interativos, conectores nativos para BigQuery e Redshift, e exportação automatizada de relatórios.",
    tags: ["React", "TypeScript", "FastAPI", "BigQuery"],
    year: "2023",
    status: "Produção",
    accent: "from-sky-400 to-violet-300",
  },
  {
    name: "MLflow Registry Hub",
    description:
      "Sistema centralizado de versionamento de modelos de machine learning com integração ao MLflow, rastreamento de experimentos e deploy automatizado.",
    tags: ["Python", "MLflow", "Docker", "GCP"],
    year: "2023",
    status: "Open Source",
    accent: "from-amber-300 to-orange-400",
  },
  {
    name: "Spark Toolkit",
    description:
      "Biblioteca utilitária para engenharia de dados com PySpark, abstrações para leitura de múltiplas fontes, transformações comuns e escrita particionada.",
    tags: ["PySpark", "Python", "Delta Lake"],
    year: "2022",
    status: "Open Source",
    accent: "from-fuchsia-300 to-rose-400",
  },
];

const SKILLS = [
  { category: "Linguagens", items: ["Python", "SQL", "TypeScript", "Scala", "Bash"] },
  { category: "Dados & Cloud", items: ["Apache Spark", "Kafka", "dbt", "Airflow", "AWS", "GCP", "Azure"] },
  { category: "Engenharia", items: ["Docker", "Kubernetes", "Terraform", "CI/CD", "Git"] },
  { category: "Web & APIs", items: ["FastAPI", "React", "Node.js", "REST", "GraphQL"] },
];

const TIMELINE = [
  {
    year: "2024",
    role: "Engenheiro de Dados Sênior",
    company: "TechCorp Brasil",
    description:
      "Liderança técnica do time de dados. Arquitetura de lake house na AWS com Delta Lake, reduzindo 40% do custo de processamento.",
  },
  {
    year: "2022",
    role: "Engenheiro de Dados Pleno",
    company: "Fintech Solutions",
    description:
      "Desenvolvimento de pipelines de ingestão para dados financeiros em tempo real e implementação de qualidade de dados com Great Expectations.",
  },
  {
    year: "2021",
    role: "Analista de Dados",
    company: "Varejo Digital S.A.",
    description:
      "Criação de dashboards executivos no Power BI, modelagem dimensional e automação de relatórios com Python.",
  },
  {
    year: "2020",
    role: "Desenvolvedor Python Jr.",
    company: "Agência WebTech",
    description:
      "Desenvolvimento de scripts de automação e APIs REST para integração entre sistemas de e-commerce e ERPs.",
  },
  {
    year: "2018",
    role: "Técnico em TI",
    company: "Prefeitura de Araçatuba",
    description:
      "Suporte técnico e desenvolvimento de sistemas internos em Python para automação de processos administrativos.",
  },
];

const STATS = [
  { label: "Anos de experiência", value: "6+", icon: BriefcaseBusiness },
  { label: "Certificados", value: "12", icon: Award },
  { label: "Projetos entregues", value: "30+", icon: Code2 },
  { label: "Tecnologias", value: "25+", icon: Sparkles },
];

const PIPELINES = [
  { label: "Kafka", value: 82 },
  { label: "Spark", value: 94 },
  { label: "dbt", value: 68 },
  { label: "Airflow", value: 76 },
  { label: "MLflow", value: 61 },
];

function getSectionId(item: string) {
  return item
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function scrollToSection(item: string) {
  document.getElementById(getSectionId(item))?.scrollIntoView({ behavior: "smooth" });
}

const sectionReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export default function App() {
  const [activeNav, setActiveNav] = useState("Sobre");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(getSectionId(item))).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          const next = NAV_ITEMS.find((item) => getSectionId(item) === visible.target.id);
          if (next) setActiveNav(next);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleNav(item: string) {
    setActiveNav(item);
    setMenuOpen(false);
    scrollToSection(item);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
      <motion.div className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-primary" style={{ scaleX }} />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            className="font-mono text-sm tracking-[0.22em] text-primary"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            THIAGO.PANINI
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNav(item)}
                className={`rounded-md px-3 py-2 font-mono text-xs transition ${
                  activeNav === item ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-muted-foreground transition hover:border-primary/50 hover:text-primary md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <motion.div
          animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="overflow-hidden border-white/10 bg-background/95 md:hidden"
        >
          <div className="grid gap-2 px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNav(item)}
                className="rounded-md border border-white/10 px-4 py-3 text-left font-mono text-xs text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>
      </nav>

      <main>
        <section className="relative min-h-screen overflow-hidden pt-16">
          <div className="data-grid absolute inset-0" />
          <div className="scan-line absolute inset-x-0 top-16 h-px" />

          <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.78fr)] lg:px-8">
            <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-primary">
                Engenheiro de Dados & Desenvolvedor
              </p>
              <h1 className="max-w-4xl text-[clamp(3.3rem,10vw,8.5rem)] font-semibold leading-[0.86] tracking-normal text-white">
                Thiago
                <span className="block font-serif italic text-primary">Panini</span>
                Cassiano
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Transformo dados brutos em produtos confiáveis: pipelines escaláveis, arquiteturas cloud-native,
                automações e interfaces que ajudam equipes a decidir com velocidade.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => handleNav("Projetos")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(49,242,161,0.2)]"
                >
                  Ver projetos <ArrowUpRight size={16} />
                </button>
                <button
                  onClick={() => handleNav("Contato")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/14 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  Chamar no contato <MessageCircle size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="visual-console relative mx-auto w-full max-w-xl"
            >
              <div className="console-shell rounded-lg border border-white/12 bg-card/82 p-4 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  </div>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                    live pipeline
                  </span>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Database, label: "raw", tone: "text-primary" },
                      { icon: Server, label: "lake", tone: "text-accent" },
                      { icon: Cloud, label: "cloud", tone: "text-[#ffd166]" },
                    ].map(({ icon: Icon, label, tone }) => (
                      <div key={label} className="rounded-md border border-white/10 bg-white/[0.03] p-3">
                        <Icon className={tone} size={18} />
                        <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-md border border-white/10 bg-background/70 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-xs text-white">throughput diário</span>
                      <span className="font-mono text-xs text-primary">2.1M eventos</span>
                    </div>
                    <div className="space-y-3">
                      {PIPELINES.map((item, index) => (
                        <div key={item.label} className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
                          <span className="font-mono text-xs text-muted-foreground">{item.label}</span>
                          <div className="h-2 overflow-hidden rounded-full bg-white/8">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ delay: 0.35 + index * 0.08, duration: 0.9, ease: "easeOut" }}
                              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-[#ffd166]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="data-stream grid grid-cols-12 gap-1.5">
                    {Array.from({ length: 84 }).map((_, index) => (
                      <span key={index} style={{ animationDelay: `${index * 38}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <button
            aria-label="Ir para sobre"
            onClick={() => handleNav("Sobre")}
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition hover:text-primary sm:block"
          >
            <ChevronDown className="animate-bounce" size={22} />
          </button>
        </section>

        <AnimatedSection id="sobre" eyebrow="01 / Sobre Mim" title="Código limpo, dados precisos.">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map(({ label, value, icon: Icon }, index) => (
                <motion.div
                  key={label}
                  variants={sectionReveal}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-lg border border-white/10 bg-card p-4 sm:p-5"
                >
                  <Icon className="mb-6 text-primary" size={18} />
                  <p className="font-serif text-4xl text-white sm:text-5xl">{value}</p>
                  <p className="mt-2 text-sm leading-snug text-muted-foreground">{label}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-5 text-base leading-8 text-muted-foreground">
              <p className="text-foreground/90">
                Sou Thiago Panini Cassiano, engenheiro de dados e desenvolvedor com mais de 6 anos de experiência
                construindo soluções que escalam. Nasci em Araçatuba/SP e hoje atuo remotamente com times distribuídos.
              </p>
              <p>
                Minha trajetória começou na TI de suporte, passou pelo desenvolvimento web e hoje se concentra na
                intersecção entre engenharia de dados, machine learning e arquitetura cloud.
              </p>
              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                {[
                  ["Localização", "Araçatuba, SP"],
                  ["Disponibilidade", "Projetos remotos"],
                  ["Foco atual", "Data Engineering"],
                  ["Idiomas", "Português e Inglês"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="projetos" eyebrow="02 / Projetos" title="Trabalhos selecionados.">
          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map((project, index) => (
              <motion.article
                key={project.name}
                variants={sectionReveal}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-card p-5 sm:p-7"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                    <span className="rounded border border-white/12 px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-primary">
                      {project.status}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white transition group-hover:text-primary">{project.name}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-white/7 px-3 py-1.5 font-mono text-xs text-foreground/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="habilidades" eyebrow="03 / Competências" title="Stack & habilidades.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {SKILLS.map(({ category, items }, index) => (
              <motion.div
                key={category}
                variants={sectionReveal}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="rounded-lg border border-white/10 bg-card p-6"
              >
                <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-primary">{category}</p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-foreground/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 rounded-lg border border-white/10 bg-secondary/55 p-5 md:grid-cols-3 md:p-7">
            {["AWS Certified", "Google Cloud", "Databricks & dbt"].map((title, index) => (
              <div key={title} className="rounded-md bg-background/45 p-4">
                <Award className="mb-4 text-[#ffd166]" size={18} />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
                <p className="mt-3 text-sm leading-6 text-foreground/80">
                  Certificações e prática aplicada em ambientes de produção, pipelines e arquitetura de dados.
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="trajetoria" eyebrow="04 / Trajetória" title="Linha do tempo.">
          <div className="relative">
            <div className="absolute bottom-0 left-3 top-0 w-px bg-white/10 md:left-1/2" />
            <div className="space-y-8">
              {TIMELINE.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.company}`}
                  variants={sectionReveal}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`relative grid gap-4 pl-10 md:grid-cols-2 md:pl-0 ${
                    index % 2 === 0 ? "" : "md:[&>article]:col-start-2"
                  }`}
                >
                  <span className="absolute left-1.5 top-3 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary md:left-1/2 md:-translate-x-1/2" />
                  <article className={`rounded-lg border border-white/10 bg-card p-5 ${index % 2 === 0 ? "md:mr-10" : "md:ml-10"}`}>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-primary">{item.year}</span>
                      <span className="text-white/20">/</span>
                      <span className="text-xs text-muted-foreground">{item.company}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </article>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contato" eyebrow="05 / Contato" title="Vamos conversar?">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">
                Estou disponível para projetos freelance, oportunidades de emprego e colaborações. Entre em contato e
                respondo em até 24h.
              </p>
              <div className="mt-8 grid gap-3">
                <ContactLink href="tel:+5518996614644" icon={Phone} label="Telefone / WhatsApp" value="(18) 99661-4644" />
                <ContactLink href="mailto:thiago.panini@email.com" icon={Mail} label="E-mail" value="thiago.panini@email.com" />
                <ContactLink href="https://linkedin.com/in/thiago-panini" icon={Linkedin} label="LinkedIn" value="linkedin.com/in/thiago-panini" />
                <ContactLink href="https://github.com/ThiagoPanini" icon={Github} label="GitHub" value="github.com/ThiagoPanini" />
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-card p-5 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Disponível para</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Projetos de Engenharia de Dados",
                  "Consultoria em Arquitetura Cloud",
                  "Desenvolvimento de Pipelines",
                  "Mentoria e Treinamentos",
                ].map((item) => (
                  <div key={item} className="rounded-md border border-white/10 bg-background/45 p-4 text-sm leading-6 text-foreground/85">
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="mailto:thiago.panini@email.com"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
              >
                Enviar mensagem <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center font-mono text-xs text-muted-foreground sm:px-6 md:flex-row lg:px-8">
          <span>© 2026 Thiago Panini Cassiano</span>
          <span>Araçatuba, SP / Brasil</span>
        </div>
      </footer>
    </div>
  );
}

function AnimatedSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionReveal}
      transition={{ duration: 0.55 }}
      className="border-t border-white/10 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
          <h2 className="text-[clamp(2.35rem,6vw,4.8rem)] font-semibold leading-[0.95] tracking-normal text-white">{title}</h2>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex min-w-0 items-center gap-4 rounded-lg border border-white/10 bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/45"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white/7 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
        <span className="mt-1 block break-words text-sm font-semibold text-white transition group-hover:text-primary">{value}</span>
      </span>
    </a>
  );
}
