import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Database,
  Download,
  Figma,
  Github,
  GraduationCap,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

const CURRICULUM_URL = "/Curriculo_Thiago_Panini_Cassiano_visual_novo.pdf";
const WHATSAPP_URL =
  "https://wa.me/5518996614644?text=Ol%C3%A1%2C%20Thiago!%20Quero%20conversar%20sobre%20um%20site%20ou%20sistema%20para%20divulgar%20meus%20servi%C3%A7os.";

const NAV_ITEMS = ["Sobre", "Serviços", "Habilidades", "Contato"];

const SERVICES = [
  {
    name: "Portfólio profissional para vendas e divulgação pessoal",
    description:
      "Criação de páginas profissionais para apresentar sua imagem, serviços, contatos, diferenciais e materiais de divulgação com visual moderno.",
    tags: ["Portfólio", "Divulgação", "Vendas", "Identidade"],
    status: "Pessoal",
    accent: "from-emerald-400 to-cyan-300",
  },
  {
    name: "Sites para venda de serviços",
    description:
      "Desenvolvimento de sites para profissionais e negócios divulgarem serviços, receberem contatos e transformarem visitantes em clientes.",
    tags: ["Landing page", "WhatsApp", "Serviços", "Conversão"],
    status: "Negócios",
    accent: "from-sky-400 to-violet-300",
  },
  {
    name: "Sistemas de divulgação de produtos e empresas",
    description:
      "Criação de sistemas e páginas para organizar produtos, apresentar empresas, exibir informações importantes e facilitar o contato comercial.",
    tags: ["Catálogo", "Empresa", "Produtos", "Sistema"],
    status: "Empresas",
    accent: "from-amber-300 to-orange-400",
  },
];

const SKILLS = [
  { category: "Web", items: ["HTML", "CSS", "JavaScript", "React", "Node.js", "PHP"] },
  { category: "Dados & Backend", items: ["MySQL", "Supabase", "APIs", "Banco de dados", "Lógica de programação"] },
  { category: "Design & IA", items: ["Figma", "Canva", "Lovable", "Codex", "IA", "Filmora"] },
  { category: "Técnico", items: ["C++", "AutoCAD", "Inventor", "Word", "PowerPoint", "Eletromecânica"] },
];

const EDUCATION = [
  {
    title: "Tecnologia em Desenvolvimento de Sistemas",
    place: "UniSalesiano",
    detail: "Cursando, início em 2025",
  },
  {
    title: "Técnico em Eletromecânica",
    place: "SENAI",
    detail: "Conclusão em 2024",
  },
  {
    title: "Ensino Médio",
    place: "SESI Samir Nakad",
    detail: "Conclusão em 2024",
  },
];

const STATS = [
  { label: "Anos de prática", value: "2+", icon: BriefcaseBusiness },
  { label: "Tipos de serviço", value: "∞", icon: Code2 },
  { label: "Tecnologias", value: "20+", icon: Sparkles },
];

const TECH_RADAR = [
  { label: "React", value: 82 },
  { label: "Node.js", value: 70 },
  { label: "MySQL", value: 68 },
  { label: "Figma", value: 78 },
  { label: "Supabase", value: 64 },
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

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-10 items-center gap-2 rounded-md border border-primary/40 px-4 font-mono text-xs text-primary transition hover:bg-primary hover:text-primary-foreground lg:inline-flex"
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>

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
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              Chamar no WhatsApp <MessageCircle size={16} />
            </a>
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
                Sites, sistemas e divulgação digital
              </p>
              <h1 className="max-w-4xl text-[clamp(3.3rem,10vw,8.5rem)] font-semibold leading-[0.86] tracking-normal text-white">
                Thiago
                <span className="block font-serif italic text-primary">Panini</span>
                Cassiano
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Soluções digitais modernas para transformar ideias, serviços e produtos em presença online, autoridade e
                oportunidades reais de negócio.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => handleNav("Serviços")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(49,242,161,0.2)]"
                >
                  Ver serviços <ArrowUpRight size={16} />
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/14 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  Pedir orçamento <MessageCircle size={16} />
                </a>
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
                    serviços digitais
                  </span>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Code2, label: "web", tone: "text-primary" },
                      { icon: Database, label: "dados", tone: "text-accent" },
                      { icon: Figma, label: "design", tone: "text-[#ffd166]" },
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
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="font-mono text-xs text-white">produção digital</span>
                      <span className="font-mono text-xs text-primary">do briefing ao deploy</span>
                    </div>
                    <div className="space-y-3">
                      {TECH_RADAR.map((item, index) => (
                        <div key={item.label} className="grid grid-cols-[4.8rem_1fr] items-center gap-3">
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

        <AnimatedSection id="sobre" eyebrow="01 / Sobre Mim" title="Desenvolvedor em formação.">
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
                Sou um desenvolvedor em formação, apaixonado por tecnologia, criação de soluções digitais e aprendizado
                constante. Tenho conhecimentos em HTML, CSS, JavaScript, PHP, C++ e desenvolvimento de sistemas, além de
                experiência com ferramentas de edição, design e inteligência artificial.
              </p>
              <p>
                Atualmente curso Tecnologia em Análise e Desenvolvimento de Sistemas e busco evoluir cada vez mais na
                área de programação, criando projetos funcionais, modernos e bem estruturados. Tenho facilidade para
                aprender novas tecnologias, resolver problemas e transformar ideias em soluções práticas.
              </p>
              <p>
                Meu objetivo é crescer profissionalmente como programador, contribuindo com projetos que gerem valor,
                unindo criatividade, organização e dedicação em cada entrega.
              </p>
              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                {[
                  ["Localização", "Bilac, SP"],
                  ["Atendimento", "Serviços personalizados"],
                  ["Foco atual", "Sites e sistemas de divulgação"],
                  ["Diferenciais", "Design, tecnologia e organização"],
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

        <AnimatedSection id="servicos" eyebrow="02 / Serviços" title="Como posso ajudar.">
          <div className="grid gap-5 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <motion.article
                key={service.name}
                variants={sectionReveal}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-card p-5 sm:p-7"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.accent}`} />
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                    <span className="rounded border border-white/12 px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-primary">
                      {service.status}
                    </span>
                  </div>
                  <Code2 className="text-muted-foreground transition group-hover:text-primary" size={18} />
                </div>
                <h3 className="text-2xl font-semibold text-white transition group-hover:text-primary">{service.name}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-white/7 px-3 py-1.5 font-mono text-xs text-foreground/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={sectionReveal}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-5 overflow-hidden rounded-lg border border-primary/30 bg-secondary/70 p-5 sm:p-7 lg:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Solução personalizada</p>
                <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">Sua ideia não está aqui?</h3>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Conte para nós o que você precisa. Desenvolvemos soluções personalizadas para transformar sua ideia em
                  um sistema funcional, moderno e feito sob medida para o seu negócio.
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(49,242,161,0.2)]"
              >
                Chamar no WhatsApp <MessageCircle size={16} />
              </a>
            </div>
          </motion.div>
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
            {EDUCATION.map((item) => (
              <div key={item.title} className="rounded-md bg-background/45 p-4">
                <GraduationCap className="mb-4 text-[#ffd166]" size={18} />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.place}</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-foreground/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="contato" eyebrow="05 / Contato" title="Vamos tirar sua ideia do papel?">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">
                Me envie uma mensagem contando o que você precisa divulgar ou vender. A partir disso, podemos pensar no
                melhor formato: portfólio profissional, site de serviços, catálogo digital ou sistema personalizado.
              </p>
              <div className="mt-8 grid gap-3">
                <ContactLink href="tel:+5518996614644" icon={Phone} label="Telefone / WhatsApp" value="(18) 99661-4644" />
                <ContactLink href="mailto:thiagopanini2007@gmail.com" icon={Mail} label="E-mail" value="thiagopanini2007@gmail.com" />
                <ContactLink href="https://github.com/cassdev-TPC" icon={Github} label="GitHub" value="github.com/cassdev-TPC" />
                <ContactLink href={CURRICULUM_URL} icon={Download} label="Currículo" value="Baixar PDF" download />
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-card p-5 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Serviços disponíveis</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Portfólios profissionais",
                  "Sites para venda de serviços",
                  "Sistemas de divulgação",
                  "Soluções sob medida",
                ].map((item) => (
                  <div key={item} className="rounded-md border border-white/10 bg-background/45 p-4 text-sm leading-6 text-foreground/85">
                    {item}
                  </div>
                ))}
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
              >
                Chamar no WhatsApp <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center font-mono text-xs text-muted-foreground sm:px-6 md:flex-row lg:px-8">
          <span>© 2026 Thiago Panini Cassiano</span>
          <span>Bilac, SP / Brasil</span>
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
  download = false,
}: {
  href: string;
  icon: typeof Phone;
  label: string;
  value: string;
  download?: boolean;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download || undefined}
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
