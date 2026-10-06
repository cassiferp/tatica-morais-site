import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Share2,
  Target,
  Sparkles,
  Palette,
  LayoutTemplate,
  Workflow,
  TrendingUp,
  Award,
  Users,
  Search,
  Instagram,
  Mail,
  MessageCircle,
} from "lucide-react";
import headerLogoAsset from "@/assets/logotipo.png.asset.json";
import teamPortraitAsset from "@/assets/tatica-morais-foto-equipe.png.asset.json";
import duraesLogoAsset from "@/assets/duraes-upload.png.asset.json";
import planteVidaLogoAsset from "@/assets/plantevida-upload.png.asset.json";
import clinsanLogoAsset from "@/assets/clinsan-upload.png.asset.json";


type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "up" | "fade" | "scale";
  delay?: number;
  as?: "div" | "section" | "li" | "figure" | "span";
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
};

function Reveal({ children, className = "", variant = "up", delay = 0, as: Tag = "div", onMouseEnter, onMouseLeave }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const variantClass = variant === "fade" ? "reveal reveal-fade" : variant === "scale" ? "reveal reveal-scale" : "reveal";
  const style: CSSProperties = delay ? { animationDelay: `${delay}ms` } : {};
  return (
    <Tag ref={ref as never} className={`${variantClass} ${visible ? "is-visible" : ""} ${className}`} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </Tag>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tática Morais — Marketing, estratégia e posicionamento" },
      {
        name: "description",
        content:
          "Gestão, conteúdo, tráfego e consultoria para fortalecer marcas, construir posicionamento e gerar crescimento.",
      },
      { property: "og:title", content: "Tática Morais — Marketing, estratégia e posicionamento" },
      {
        property: "og:description",
        content: "Gestão, conteúdo, tráfego e consultoria para fortalecer marcas e gerar crescimento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const BRAND = "Tática Morais";

function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-transparent backdrop-blur-md bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="flex items-center gap-3">
          <img src={headerLogoAsset.url} alt="Tática Morais" className="h-9 w-auto" />
          <span className="font-display text-xl tracking-tight">Tática Morais</span>
        </a>
        <nav className="hidden gap-10 md:flex">
          {[
            ["Sobre", "#sobre"],
            ["Serviços", "#servicos"],
            ["Método", "#cases"],
            ["Depoimentos", "#depoimentos"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Falar com a equipe
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </header>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const longest = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 110);
      } else {
        timeout = setTimeout(() => setPhase("holding"), 50);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 1800);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 55);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, wordIdx, words]);

  return (
    <span className="group relative inline-block text-left">
      {/* Invisible spacer locks the width to the longest word so layout never shifts */}
      <span className="invisible whitespace-nowrap">{longest}</span>
      {/* Actual text layer */}
      <span className="absolute left-0 top-0 inline-flex items-baseline whitespace-nowrap transition-colors duration-300 group-hover:text-primary">
        <span aria-live="polite">{text}</span>
        <span
          aria-hidden
          className="ml-[0.06em] inline-block w-[0.06em] self-stretch bg-primary animate-caret-blink"
          style={{ height: "0.9em", transform: "translateY(0.05em)" }}
        />
      </span>
    </span>
  );
}

function Hero() {
  const marquee = ["Gestão", "Tráfego Pago", "Consultoria", "Estratégia", "Posicionamento", "Branding", "Campanhas", "Vendas", "Treinamentos", "Social Selling", "Gestão", "Tráfego Pago", "Consultoria", "Estratégia", "Posicionamento", "Branding", "Campanhas", "Vendas", "Treinamentos", "Social Selling"];
  return (
    <section id="top" className="relative isolate flex flex-col">
      {/* Subtle ambient background */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      </div>

      <div className="relative mx-auto flex w-full min-h-[calc(100svh-6rem)] max-w-7xl flex-col gap-2 px-6 pt-28 lg:flex-row lg:items-center lg:pt-12">
        <div className="relative z-10 flex flex-1 flex-col items-start justify-center text-left">
          <Reveal as="span" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-10 bg-primary/70" />
            Marketing, estratégia e posicionamento de marcas
          </Reveal>

          <Reveal delay={140}>
            <h1 className="mt-6 flex flex-col items-start font-display text-[clamp(3rem,9vw,7rem)] lg:text-[clamp(3rem,5.6vw,6rem)] leading-[0.95] tracking-[-0.04em] uppercase">
              <RotatingWord words={["Marketing", "Estratégia", "Conteúdo", "Consultoria"]} />
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/85 md:text-lg">
              Gestão, conteúdo, tráfego e consultoria para fortalecer marcas, construir posicionamento e gerar crescimento.
            </p>
          </Reveal>

          <a
            href="#servicos"
            className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-12 py-5 text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
          >
            <span className="text-sm font-medium">Conheça nossos serviços</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="relative -mt-16 flex min-w-0 flex-1 items-end justify-center overflow-visible lg:-mt-24 lg:justify-end lg:self-stretch lg:-mr-[max(0px,calc((100dvw_-_80rem)/2_-_20px))]">
          <img
            src={teamPortraitAsset.url}
            alt="Equipe Tática Morais"
            className="block h-auto max-h-[87svh] w-full origin-bottom scale-[1.06] object-contain object-bottom lg:origin-bottom-right lg:object-right-bottom lg:-translate-x-[max(0px,calc((100dvw_-_80rem)/2_-_20px))]"
          />




        </div>
      </div>

      {/* Marquee of disciplines */}
      <div className="relative overflow-hidden border-y border-border/60 bg-background/60 py-6 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {marquee.map((m, i) => (
            <span key={i} className="inline-flex items-center gap-12 font-display text-2xl text-muted-foreground/70 md:text-3xl">
              {m}
              <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const items = ["PLANTE VIDA", "DURÃES", "CLINSAN", "KARTAL", "MAXXI VEÍCULOS"];
  return (
    <section className="border-y border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-14 gap-y-4 px-6">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Marcas que confiam</span>
        {items.map((i, idx) => (
          <Reveal as="span" key={i} delay={idx * 80} className="font-display text-lg tracking-widest text-muted-foreground/70 transition-colors hover:text-primary">
            {i}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-primary">Sobre a {BRAND}</span>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              Um time completo de especialistas por trás de cada etapa do seu marketing.
            </h2>
          </Reveal>
          <div className="space-y-6 text-lg text-muted-foreground">
            <Reveal delay={120}>
              <p>
                A Tática Morais é uma agência de marketing focada em gestão, conteúdo, posicionamento, tráfego e
                estratégias de crescimento para empresas e profissionais.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p>
                Trabalhamos com marketing inteligente para transformar presença digital em visibilidade,
                posicionamento e oportunidades de venda. Cada estratégia é construída de acordo com os objetivos,
                o público e o momento de cada negócio.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p>
                Planejamos, criamos, executamos e acompanhamos cada etapa para que a comunicação tenha direção,
                consistência e gere impacto no crescimento da marca.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-6 border-t border-border pt-8">
              {[
                ["Estratégia com direção", "Planejamento pensado para os objetivos, o público e o momento de cada negócio."],
                ["Time especializado", "Profissionais de estratégia, conteúdo, design, vídeo, tráfego e gestão trabalhando de forma integrada."],
                ["Conteúdo que posiciona", "Conteúdos estratégicos para ampliar visibilidade, gerar autoridade, fortalecer a marca e criar conexão com o público."],
                ["Marketing para crescer", "Estratégias que unem posicionamento, visibilidade e vendas para transformar presença digital em oportunidades reais de crescimento."],
              ].map(([t, d], idx) => (
                <Reveal key={t} delay={idx * 100}>
                  <div className="font-display text-lg text-foreground">{t}</div>
                  <div className="mt-1.5 text-sm text-muted-foreground">{d}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Share2,
      title: "Gestão de Redes Sociais",
      desc: "Gestão estratégica da presença digital da sua marca, realizada por uma equipe especializada em posicionamento e comunicação.",
      details: ["Planejamento, calendário editorial e acompanhamento estratégico para construir uma presença consistente, ampliar a visibilidade e fortalecer a marca nas redes sociais."],
    },
    {
      icon: Sparkles,
      title: "Produção de Conteúdo & Campanhas",
      desc: "Produção estratégica criada para chamar atenção, fortalecer posicionamento, gerar desejo e apoiar os objetivos comerciais da marca.",
      details: [
        "Produzimos vídeos, artes, carrosséis, campanhas promocionais e institucionais, lançamentos e ações especiais.",
        "Também captamos conteúdo em eventos, transformando cada ação em comunicação estratégica para a marca.",
      ],
    },
    {
      icon: Target,
      title: "Tráfego Pago",
      desc: "Gestão especializada de mídia para transformar investimento em visibilidade, oportunidades e vendas.",
      details: [
        "Planejamos, criamos e otimizamos campanhas para colocar sua empresa diante das pessoas certas e gerar mais oportunidades.",
        "Estratégia, análise de dados e foco em performance para empresas que querem vender mais.",
      ],
    },
    {
      icon: Palette,
      title: "Branding & Posicionamento",
      desc: "Construímos marcas fortes, profissionais e preparadas para ocupar espaço no mercado.",
      details: ["Estratégia de marca, identidade e comunicação para aumentar a percepção de valor, fortalecer autoridade e fazer sua empresa ser escolhida pelo público certo."],
    },
    {
      icon: LayoutTemplate,
      title: "Consultoria & Treinamentos",
      desc: "Estratégia e conhecimento aplicados à realidade de empresas, equipes e profissionais.",
      details: [
        "Consultorias e treinamentos personalizados em marketing, vendas, atendimento, posicionamento e gestão de equipes.",
        "Sempre com direcionamento prático, estruturado conforme os objetivos e o momento do seu negócio.",
      ],
    },
    {
      icon: Workflow,
      title: "Social Selling & Estrutura Comercial",
      desc: "Uma operação comercial especializada para transformar oportunidades em vendas.",
      details: [
        "Profissionais de Social Selling na prospecção, qualificação, atendimento e acompanhamento de potenciais clientes.",
        "Também estruturamos processos, implementamos CRM e organizamos a jornada de vendas para aumentar a conversão.",
      ],
    },
  ];
  return (
    <section id="servicos" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-primary">Serviços</span>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              Tudo o que sua marca precisa para crescer com estratégia.
            </h2>
          </Reveal>
          <Reveal delay={120} className="max-w-sm text-muted-foreground">
            Uma estrutura integrada de marketing, conteúdo, mídia, posicionamento e vendas, com soluções
            independentes ou combinadas para cada negócio.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, details }, idx) => (
            <Reveal
              key={title}
              delay={idx * 90}
              className="flip-card perspective-1000"
            >
              <div className="flip-card-inner relative h-full min-h-[380px] w-full preserve-3d transition-transform duration-700">
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-card p-10 transition-colors duration-500 hover:bg-secondary/60">
                  <Icon className="h-7 w-7 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" strokeWidth={1.4} />
                  <h3 className="mt-8 font-display text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  <ArrowUpRight className="absolute right-8 top-8 h-5 w-5 text-muted-foreground/40 transition-all duration-500 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex flex-col backface-hidden rotate-y-180 bg-primary p-8 text-primary-foreground md:p-10">
                  <h3 className="font-display text-2xl">{title}</h3>
                  <div className="mt-4 flex-1 space-y-4 text-sm leading-relaxed text-primary-foreground/85 md:text-base">
                    {details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  <a
                    href="#contato"
                    className="mt-4 inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-primary-foreground/10 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-all hover:bg-primary-foreground/20"
                  >
                    Conheça o serviço
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const items = [
    { icon: TrendingUp, title: "Mais vendas", desc: "Marketing, mídia e ações comerciais trabalhando de forma conectada para ampliar oportunidades, melhorar conversão e gerar crescimento em vendas." },
    { icon: Award, title: "Mais autoridade", desc: "Posicionamento, comunicação e presença digital construídos para aumentar a percepção de valor e fortalecer sua marca diante do mercado." },
    { icon: Users, title: "Mais leads qualificados", desc: "Conteúdo, tráfego e aquisição direcionados para atrair pessoas com maior potencial de se tornarem clientes da sua empresa." },
    { icon: Search, title: "Posicionamento mais forte", desc: "Uma presença consistente, profissional e bem direcionada para sua marca ganhar espaço, ser lembrada e se diferenciar diante do público certo." },
  ];
  return (
    <section className="relative overflow-hidden py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">Benefícios</span>
          <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
            O que sua marca conquista ao trabalhar com a {BRAND}.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Um time especializado, execução integrada e foco nos objetivos reais do seu negócio.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }, idx) => {
            const isHovered = hoveredIdx === idx;
            const isOther = hoveredIdx !== null && hoveredIdx !== idx;
            return (
              <Reveal
                key={title}
                delay={idx * 100}
                className={`rounded-2xl border border-border bg-card p-8 transition-all duration-500 cursor-pointer ${
                  isHovered
                    ? "scale-105 border-primary/40 shadow-[var(--shadow-glow)] z-10"
                    : isOther
                      ? "blur-[2px] opacity-70 scale-95"
                      : "hover:border-primary/40 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
                }`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 transition-transform duration-500 ${isHovered ? "scale-110" : ""}`}>
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Cases() {
  const stats = [
    { value: "01", label: "Diagnóstico", note: "Entendemos o negócio, o público, o mercado e os principais desafios antes de definir os próximos passos." },
    { value: "02", label: "Planejamento", note: "Organizamos prioridades, comunicação, canais e ações para que cada investimento tenha uma direção clara." },
    { value: "03", label: "Execução especializada", note: "Cada frente é conduzida por profissionais preparados para sua área, do conteúdo e design ao tráfego, posicionamento e comercial." },
    { value: "04", label: "Acompanhamento", note: "Analisamos o desenvolvimento do trabalho, identificamos oportunidades e ajustamos as ações conforme a evolução do negócio." },
  ];
  return (
    <section id="cases" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-primary">Nosso jeito de trabalhar</span>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              Marketing com direção do início ao resultado.
            </h2>
          </Reveal>
          <Reveal delay={120} className="max-w-sm text-muted-foreground">
            Cada projeto parte de uma análise real do negócio. Entendemos o momento da marca, definimos prioridades e direcionamos cada serviço de acordo com os objetivos da empresa.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => (
            <Reveal variant="scale" key={s.label} delay={idx * 110} className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card to-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
              <div className="font-display text-5xl text-primary transition-transform duration-500 group-hover:scale-105">{s.value}</div>
              <div className="mt-6 font-display text-lg text-foreground">{s.label}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.note}</div>
              <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      q: [
        "Estamos com a Tática há mais de três anos e, nesse período, vimos a Durães fortalecer muito sua presença, sua comunicação e seu posicionamento. Hoje temos duas lojas e uma marca cada vez mais reconhecida.",
        "Acredito muito na consistência: todos os meses trabalhamos campanhas de vendas, ações comerciais e oportunidades do nosso calendário, sempre com acompanhamento, planejamento e alinhamento da Tática. Essa constância fez diferença na forma como a Durães se comunica, vende e constrói autoridade no mercado.",
      ],
      n: "Renata Maforte",
      r: "Durães Eletromóveis",
      logo: duraesLogoAsset.url,
      logoAlt: "Durães Eletromóveis",
    },
    {
      q: [
        "Estamos há mais de dois anos com a Tática e vimos a Plante Vida ganhar força, presença e reconhecimento no mercado.",
        "O crescimento da empresa vem de um conjunto de fatores, e o marketing tem papel importante nessa construção. Na primeira Feira de Agronegócios, movimentamos mais de R$ 15 milhões em negócios; na segunda edição, ultrapassamos R$ 30 milhões.",
        "Investir no posicionamento da marca foi uma decisão importante para a fase de crescimento que vivemos hoje.",
      ],
      n: "Tiago dos Santos",
      r: "Plante Vida",
      logo: planteVidaLogoAsset.url,
      logoAlt: "Plante Vida",
    },
    {
      q: [
        "Somos clientes da Tática desde os primeiros anos da agência. Já tínhamos reconhecimento profissional, mas o marketing ajudou a ampliar nossa presença e mostrar com mais força a qualidade e a autoridade da Clinsan.",
        "Com o tempo, nossa marca ganhou valorização, a procura cresceu e hoje temos uma agenda muito disputada, com atendimentos agendados com bastante antecedência.",
        "A Tática acompanha nossa trajetória há anos e teve papel importante na construção do posicionamento que a Clinsan conquistou no mercado.",
      ],
      n: "Dra. Aline e Dra. Amanda",
      r: "Clinsan Odontologia",
      logo: clinsanLogoAsset.url,
      logoAlt: "Clinsan Odontologia",
    },
  ];
  return (
    <section id="depoimentos" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">Depoimentos</span>
          <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
            A experiência de quem constrói resultados com a Tática.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {quotes.map((t, idx) => (
            <Reveal as="figure" variant="scale" key={t.n} delay={idx * 140} className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elegant)]">
              <div className="font-display text-3xl leading-none text-primary">"</div>
              <blockquote className="mt-4 flex-1 space-y-4 text-base leading-relaxed text-foreground/90">
                {t.q.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-5">
                 <img src={t.logo} alt={t.logoAlt} className="mb-5 h-12 w-auto object-contain object-left" />
                <div className="font-display text-lg">{t.n}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.r}</div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contato" className="relative overflow-hidden py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal as="span" className="text-xs uppercase tracking-[0.25em] text-primary">Vamos conversar</Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] text-balance md:text-7xl">
            Seu negócio merece um time à altura do que você quer <em className="text-primary not-italic">construir</em>.
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <div className="mx-auto mt-8 max-w-2xl space-y-5 text-lg text-muted-foreground">
            <p>
              Na Tática Morais, você encontra um time preparado para cuidar do seu marketing com direção,
              acompanhamento e execução especializada.
            </p>
            <p>
              Trabalhamos com marketing inteligente para fortalecer sua marca, ampliar sua visibilidade, gerar
              oportunidades e apoiar o crescimento das vendas.
            </p>
            <p>
              Você não precisa conduzir tudo sozinho. Nosso papel é pensar junto com o seu negócio, identificar
              oportunidades e transformar marketing em movimento de crescimento.
            </p>
          </div>
        </Reveal>
        <Reveal delay={340} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/5527998169243"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
          >
            Quero falar com a Tática
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={headerLogoAsset.url} alt="Tática Morais" className="h-12 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Marketing inteligente, posicionamento, conteúdo, mídia e vendas para empresas e profissionais.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Contato</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> <a href="mailto:taticamoraismkt@gmail.com">taticamoraismkt@gmail.com</a></li>
            <li className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-primary" /> <a href="https://wa.me/5527998169243" target="_blank" rel="noreferrer">+55 27 99816-9243</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Redes</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-3"><Instagram className="h-4 w-4 text-primary" /> <a href="https://instagram.com/taticamorais" target="_blank" rel="noreferrer">@taticamorais</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {BRAND}. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Logos />
        <About />
        <Services />
        <Benefits />
        <Cases />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
