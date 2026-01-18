import React, { useState, useMemo } from 'react'
import {
  Search,
  AlertTriangle,
  Globe,
  Shield,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  Beaker,
  Pill,
  Heart,
  Filter,
} from 'lucide-react'

// Base de dados completa - 48 medicamentos ototóxicos
const meds = [
  // ===== ANTINEOPLÁSICOS (PLATINA) =====
  {
    id: 1,
    s: 'Cisplatin',
    generic: 'Cisplatina',
    c: 'Antineoplásico (Platina)',
    r: 'CRITICAL',
    t: ['Cochleotoxicity'],
    damage: 'Coclear (Alta Freq.)',
    g: { m: [], note: 'Risco máximo em crianças. Monitorar audiometria antes, durante e após tratamento.' },
    n: {
      br: ['Cisplatina', 'Platistine', 'Tecnoplatin', 'Fauldcispla'],
      us: ['Platinol', 'Platinol-AQ'],
      fr: ['Cisplatine', 'Cisplatyl'],
      de: ['Cisplatin', 'Platinex'],
      es: ['Cisplatino', 'Neoplatin'],
      it: ['Cisplatino', 'Platamine'],
    },
    i: ['Aminoglicosídeos', 'Furosemida', 'Radioterapia craniana'],
    rev: 'Irreversível',
    mech: 'Gera espécies reativas de oxigênio (ROS) que destroem células ciliadas externas, começando pela base da cóclea (frequências altas).',
  },
  {
    id: 2,
    s: 'Carboplatin',
    generic: 'Carboplatina',
    c: 'Antineoplásico (Platina)',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Dose-dependente. Menos ototóxico que cisplatina, mas ainda significativo.' },
    n: {
      br: ['Carboplatina', 'Paraplatin', 'Tecnocarb'],
      us: ['Paraplatin'],
      fr: ['Carboplatine', 'Paraplatine'],
      de: ['Carboplatin'],
      es: ['Carboplatino'],
      it: ['Carboplatino'],
    },
    i: ['Aminoglicosídeos', 'Radioterapia'],
    rev: 'Irreversível',
    mech: 'Mecanismo similar à cisplatina, porém com menor penetração coclear.',
  },
  {
    id: 3,
    s: 'Oxaliplatin',
    generic: 'Oxaliplatina',
    c: 'Antineoplásico (Platina)',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Neuro/Coclear',
    g: { m: [], note: 'Menor ototoxicidade que cisplatina. Neurotoxicidade periférica mais comum.' },
    n: {
      br: ['Oxaliplatina', 'Eloxatin'],
      us: ['Eloxatin'],
      fr: ['Eloxatine', 'Oxaliplatine'],
      de: ['Eloxatin'],
      es: ['Eloxatin'],
      it: ['Eloxatin'],
    },
    i: ['Outros agentes neurotóxicos'],
    rev: 'Irreversível',
    mech: 'Dano coclear e neural por estresse oxidativo.',
  },

  // ===== ANTINEOPLÁSICOS (OUTROS) =====
  {
    id: 4,
    s: 'Vincristine',
    generic: 'Vincristina',
    c: 'Antineoplásico (Alcaloide da Vinca)',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Sinergia com platinas. Monitorar em protocolos combinados.' },
    n: {
      br: ['Vincristina', 'Oncovin'],
      us: ['Oncovin', 'Vincasar'],
      fr: ['Oncovin'],
      de: ['Vincristin'],
      es: ['Vincristina'],
      it: ['Vincristina'],
    },
    i: ['Cisplatina', 'Carboplatina'],
    rev: 'Irreversível',
    mech: 'Inibe função dos microtúbulos, afetando transporte axonal nas células ciliadas.',
  },
  {
    id: 5,
    s: 'Vinblastine',
    generic: 'Vinblastina',
    c: 'Antineoplásico (Alcaloide da Vinca)',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Similar à vincristina.' },
    n: {
      br: ['Vinblastina', 'Velban'],
      us: ['Velban'],
      fr: ['Velbé'],
      de: ['Vinblastin'],
      es: ['Vinblastina'],
      it: ['Vinblastina'],
    },
    i: ['Platinas'],
    rev: 'Irreversível',
    mech: 'Disrupção de microtúbulos com efeito tóxico coclear.',
  },
  {
    id: 6,
    s: 'Paclitaxel',
    generic: 'Paclitaxel',
    c: 'Antineoplásico (Taxano)',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Ototoxicidade documentada, especialmente em combinação com platinas.' },
    n: {
      br: ['Paclitaxel', 'Taxol', 'Abraxane'],
      us: ['Taxol', 'Abraxane', 'Onxol'],
      fr: ['Taxol', 'Paxene'],
      de: ['Taxol'],
      es: ['Taxol'],
      it: ['Taxol'],
    },
    i: ['Cisplatina', 'Carboplatina'],
    rev: 'Parcialmente irreversível',
    mech: 'Estabiliza microtúbulos anormalmente, causando disfunção celular.',
  },
  {
    id: 7,
    s: 'Docetaxel',
    generic: 'Docetaxel',
    c: 'Antineoplásico (Taxano)',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Perfil similar ao paclitaxel.' },
    n: {
      br: ['Docetaxel', 'Taxotere'],
      us: ['Taxotere', 'Docefrez'],
      fr: ['Taxotère'],
      de: ['Taxotere'],
      es: ['Taxotere'],
      it: ['Taxotere'],
    },
    i: ['Platinas'],
    rev: 'Parcialmente irreversível',
    mech: 'Mesmo mecanismo do paclitaxel.',
  },
  {
    id: 8,
    s: 'Bleomycin',
    generic: 'Bleomicina',
    c: 'Antineoplásico (Antibiótico)',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Usado em protocolos de linfoma e tumores germinativos.' },
    n: {
      br: ['Bleomicina', 'Blenoxane'],
      us: ['Blenoxane'],
      fr: ['Bléomycine'],
      de: ['Bleomycin'],
      es: ['Bleomicina'],
      it: ['Bleomicina'],
    },
    i: ['Cisplatina'],
    rev: 'Irreversível',
    mech: 'Induz quebras no DNA e estresse oxidativo nas células ciliadas.',
  },
  {
    id: 9,
    s: 'Methotrexate',
    generic: 'Metotrexato',
    c: 'Antineoplásico (Antimetabólito)',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Ototoxicidade rara. Mais comum em doses altas intratecais.' },
    n: {
      br: ['Metotrexato', 'Trexall'],
      us: ['Trexall', 'Rheumatrex', 'Otrexup'],
      fr: ['Méthotrexate', 'Novatrex'],
      de: ['Methotrexat'],
      es: ['Metotrexato'],
      it: ['Methotrexate'],
    },
    i: ['AINEs (aumentam toxicidade)'],
    rev: 'Reversível',
    mech: 'Inibe síntese de folato, afetando metabolismo celular coclear.',
  },
  {
    id: 10,
    s: 'Nitrogen Mustard',
    generic: 'Mostarda Nitrogenada',
    c: 'Antineoplásico (Alquilante)',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Uso histórico, pouco utilizado atualmente. Mecloretamina.' },
    n: {
      br: ['Mecloretamina', 'Mustargen'],
      us: ['Mustargen'],
      fr: ['Caryolysine'],
      de: ['Mustargen'],
      es: ['Mecloretamina'],
      it: ['Mecloretamina'],
    },
    i: ['Outros alquilantes'],
    rev: 'Irreversível',
    mech: 'Alquilação do DNA com dano celular permanente.',
  },

  // ===== ANTIBIÓTICOS (AMINOGLICOSÍDEOS) =====
  {
    id: 11,
    s: 'Gentamicin',
    generic: 'Gentamicina',
    c: 'Antibiótico (Aminoglicosídeo)',
    r: 'CRITICAL',
    t: ['Vestibulotoxicity', 'Cochleotoxicity'],
    damage: 'Vestibular > Coclear',
    g: {
      m: ['A1555G', 'C1494T'],
      note: 'Mutação MT-RNR1: risco de surdez profunda com dose única. Teste genético recomendado.',
    },
    n: {
      br: ['Gentamicina', 'Garamicina', 'Gentamax', 'Gentamicol'],
      us: ['Garamycin', 'Gentak', 'Genoptic'],
      fr: ['Gentamicine', 'Gentalline'],
      de: ['Gentamicin', 'Refobacin'],
      es: ['Gentamicina', 'Gevramycin'],
      it: ['Gentamicina', 'Gentalyn'],
    },
    i: ['Furosemida', 'Vancomicina', 'Cisplatina'],
    rev: 'Irreversível',
    mech: 'Acúmulo na perilinfa e endolinfa, destruição de células ciliadas por apoptose. Mais vestibulotóxica.',
  },
  {
    id: 12,
    s: 'Tobramycin',
    generic: 'Tobramicina',
    c: 'Antibiótico (Aminoglicosídeo)',
    r: 'CRITICAL',
    t: ['Cochleotoxicity', 'Vestibulotoxicity'],
    damage: 'Coclear/Vestibular',
    g: { m: ['A1555G', 'C1494T'], note: 'Mesmas mutações MT-RNR1 da gentamicina. Cuidado em fibrose cística.' },
    n: {
      br: ['Tobramicina', 'Tobrex', 'Tobra', 'Tobi'],
      us: ['Tobrex', 'Nebcin', 'Bethkis', 'TOBI'],
      fr: ['Tobrex', 'Nebcine'],
      de: ['Tobrex', 'Gernebcin'],
      es: ['Tobrex', 'Tobradex'],
      it: ['Tobrex'],
    },
    i: ['Furosemida', 'Vancomicina'],
    rev: 'Irreversível',
    mech: 'Mesmo mecanismo dos aminoglicosídeos - toxicidade mitocondrial.',
  },
  {
    id: 13,
    s: 'Amikacin',
    generic: 'Amicacina',
    c: 'Antibiótico (Aminoglicosídeo)',
    r: 'CRITICAL',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: ['A1555G', 'C1494T'], note: 'Risco genético MT-RNR1. Predominantemente cocleotóxico.' },
    n: {
      br: ['Amicacina', 'Amikin', 'Novamin'],
      us: ['Amikin', 'Arikayce'],
      fr: ['Amiklin'],
      de: ['Amikin', 'Biklin'],
      es: ['Amikacina'],
      it: ['Amikacina', 'Likacin'],
    },
    i: ['Furosemida', 'Vancomicina', 'Cisplatina'],
    rev: 'Irreversível',
    mech: 'Destruição preferencial de células ciliadas da cóclea.',
  },
  {
    id: 14,
    s: 'Neomycin',
    generic: 'Neomicina',
    c: 'Antibiótico (Aminoglicosídeo)',
    r: 'CRITICAL',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'TÓXICO MESMO TÓPICO se membrana timpânica perfurada. Contraindicado em ouvido médio.' },
    n: {
      br: ['Neomicina', 'Nebacetin', 'Neosporin'],
      us: ['Neosporin', 'Neo-Fradin'],
      fr: ['Néomycine'],
      de: ['Neomycin'],
      es: ['Neomicina'],
      it: ['Neomicina'],
    },
    i: ['Qualquer uso sistêmico'],
    rev: 'Irreversível',
    mech: 'Altíssima toxicidade coclear - evitar uso sistêmico e em ouvido médio.',
  },
  {
    id: 15,
    s: 'Streptomycin',
    generic: 'Estreptomicina',
    c: 'Antibiótico (Aminoglicosídeo)',
    r: 'CRITICAL',
    t: ['Vestibulotoxicity'],
    damage: 'Vestibular',
    g: { m: ['A1555G', 'C1494T'], note: 'Tratamento de tuberculose. Predominantemente vestibulotóxico.' },
    n: {
      br: ['Estreptomicina'],
      us: ['Streptomycin'],
      fr: ['Streptomycine'],
      de: ['Streptomycin'],
      es: ['Estreptomicina'],
      it: ['Streptomicina'],
    },
    i: ['Outros aminoglicosídeos', 'Furosemida'],
    rev: 'Irreversível',
    mech: 'Dano preferencial ao sistema vestibular - vertigem e desequilíbrio permanentes.',
  },
  {
    id: 16,
    s: 'Kanamycin',
    generic: 'Canamicina',
    c: 'Antibiótico (Aminoglicosídeo)',
    r: 'CRITICAL',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: ['A1555G', 'C1494T'], note: 'Usado em TB resistente. Alta cocleotoxicidade.' },
    n: {
      br: ['Canamicina', 'Kantrex'],
      us: ['Kantrex'],
      fr: ['Kanamycine'],
      de: ['Kanamycin'],
      es: ['Kanamicina'],
      it: ['Kanamicina'],
    },
    i: ['Furosemida', 'Outros aminoglicosídeos'],
    rev: 'Irreversível',
    mech: 'Destruição de células ciliadas cocleares por mecanismo de aminoglicosídeos.',
  },
  {
    id: 17,
    s: 'Netilmicin',
    generic: 'Netilmicina',
    c: 'Antibiótico (Aminoglicosídeo)',
    r: 'HIGH',
    t: ['Cochleotoxicity', 'Vestibulotoxicity'],
    damage: 'Coclear/Vestibular',
    g: { m: ['A1555G', 'C1494T'], note: 'Menor toxicidade relativa entre aminoglicosídeos, mas ainda significativa.' },
    n: {
      br: ['Netilmicina', 'Netromicina'],
      us: ['Netromycin'],
      fr: ['Nétilmicine'],
      de: ['Netilmicin'],
      es: ['Netilmicina'],
      it: ['Netilmicina'],
    },
    i: ['Furosemida'],
    rev: 'Irreversível',
    mech: 'Mesmo mecanismo, porém com melhor perfil de segurança que outros aminoglicosídeos.',
  },

  // ===== ANTIBIÓTICOS (OUTROS) =====
  {
    id: 18,
    s: 'Vancomycin',
    generic: 'Vancomicina',
    c: 'Antibiótico (Glicopeptídeo)',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Risco alto se associado a Furosemida ou Aminoglicosídeos. Monitorar níveis séricos.' },
    n: {
      br: ['Vancomicina', 'Vancocina', 'Vancoled'],
      us: ['Vancocin', 'Firvanq'],
      fr: ['Vancomycine'],
      de: ['Vancomycin'],
      es: ['Vancomicina'],
      it: ['Vancomicina'],
    },
    i: ['Furosemida', 'Aminoglicosídeos'],
    rev: 'Geralmente reversível',
    mech: 'Ototoxicidade potenciada por diuréticos de alça e aminoglicosídeos.',
  },
  {
    id: 19,
    s: 'Erythromycin',
    generic: 'Eritromicina',
    c: 'Antibiótico (Macrolídeo)',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Coclear/Zumbido',
    g: { m: [], note: 'Risco com doses IV altas (>4g/dia). Perda auditiva geralmente reversível.' },
    n: {
      br: ['Eritromicina', 'Ilosone', 'Pantomicina', 'Eritrex'],
      us: ['E-Mycin', 'Eryc', 'Erythrocin', 'PCE'],
      fr: ['Érythromycine', 'Érythrocine', 'Abboticine'],
      de: ['Erythromycin', 'Infectomycin'],
      es: ['Eritromicina', 'Pantomicina'],
      it: ['Eritromicina', 'Eritrocina'],
    },
    i: ['Outras drogas ototóxicas'],
    rev: 'Reversível',
    mech: 'Efeito tóxico direto em altas concentrações séricas.',
  },
  {
    id: 20,
    s: 'Azithromycin',
    generic: 'Azitromicina',
    c: 'Antibiótico (Macrolídeo)',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Risco baixo. Casos raros relatados, principalmente com uso prolongado.' },
    n: {
      br: ['Azitromicina', 'Zitromax', 'Astro', 'Azi', 'Azitromin'],
      us: ['Zithromax', 'Z-Pack', 'Zmax'],
      fr: ['Zithromax', 'Azadose'],
      de: ['Zithromax', 'Azithromycin'],
      es: ['Zitromax', 'Vinzam'],
      it: ['Zitromax', 'Ribotrex'],
    },
    i: [],
    rev: 'Reversível',
    mech: 'Mecanismo não totalmente elucidado. Ototoxicidade rara.',
  },
  {
    id: 21,
    s: 'Clarithromycin',
    generic: 'Claritromicina',
    c: 'Antibiótico (Macrolídeo)',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Risco baixo, similar à azitromicina.' },
    n: {
      br: ['Claritromicina', 'Klaricid', 'Claritrin'],
      us: ['Biaxin', 'Biaxin XL'],
      fr: ['Zeclar', 'Naxy'],
      de: ['Klacid'],
      es: ['Klacid', 'Klaricid'],
      it: ['Klacid', 'Macladin'],
    },
    i: [],
    rev: 'Reversível',
    mech: 'Similar aos outros macrolídeos.',
  },
  {
    id: 22,
    s: 'Minocycline',
    generic: 'Minociclina',
    c: 'Antibiótico (Tetraciclina)',
    r: 'WEAK',
    t: ['Vestibulotoxicity'],
    damage: 'Vestibular',
    g: { m: [], note: 'Tontura e vertigem são efeitos colaterais comuns, especialmente em mulheres.' },
    n: {
      br: ['Minociclina', 'Minomax'],
      us: ['Minocin', 'Dynacin', 'Solodyn'],
      fr: ['Minocine', 'Mestacine'],
      de: ['Minocyclin', 'Skid'],
      es: ['Minocin'],
      it: ['Minocin'],
    },
    i: [],
    rev: 'Reversível',
    mech: 'Afeta função vestibular, causando vertigem dose-dependente.',
  },
  {
    id: 23,
    s: 'Capreomycin',
    generic: 'Capreomicina',
    c: 'Antibiótico (Peptídico)',
    r: 'HIGH',
    t: ['Cochleotoxicity', 'Vestibulotoxicity'],
    damage: 'Coclear/Vestibular',
    g: { m: [], note: 'Usado em TB resistente. Ototoxicidade significativa.' },
    n: {
      br: ['Capreomicina', 'Capastat'],
      us: ['Capastat'],
      fr: ['Capréomycine'],
      de: ['Capreomycin'],
      es: ['Capreomicina'],
      it: ['Capreomicina'],
    },
    i: ['Aminoglicosídeos', 'Furosemida'],
    rev: 'Irreversível',
    mech: 'Similar aos aminoglicosídeos - dano às células ciliadas.',
  },
  {
    id: 24,
    s: 'Polymyxin B',
    generic: 'Polimixina B',
    c: 'Antibiótico (Polipeptídeo)',
    r: 'HIGH',
    t: ['Cochleotoxicity', 'Vestibulotoxicity'],
    damage: 'Coclear/Vestibular',
    g: { m: [], note: 'Evitar aplicação tópica em ouvido médio se perfuração. Uso sistêmico muito tóxico.' },
    n: {
      br: ['Polimixina B', 'Otosporin'],
      us: ['Poly-Rx', 'Neosporin'],
      fr: ['Polymyxine B'],
      de: ['Polymyxin B'],
      es: ['Polimixina B'],
      it: ['Polimixina B'],
    },
    i: ['Aminoglicosídeos'],
    rev: 'Irreversível',
    mech: 'Dano direto à membrana celular das células ciliadas.',
  },
  {
    id: 25,
    s: 'Amphotericin B',
    generic: 'Anfotericina B',
    c: 'Antifúngico (Polieno)',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Antifúngico sistêmico. Ototoxicidade documentada em tratamentos prolongados.' },
    n: {
      br: ['Anfotericina B', 'Fungizone', 'AmBisome'],
      us: ['Fungizone', 'AmBisome', 'Abelcet'],
      fr: ['Fungizone', 'AmBisome'],
      de: ['Amphotericin B', 'AmBisome'],
      es: ['Anfotericina B'],
      it: ['Anfotericina B', 'AmBisome'],
    },
    i: ['Aminoglicosídeos', 'Ciclosporina'],
    rev: 'Irreversível',
    mech: 'Liga-se a ergosterol, mas também afeta células mamíferas incluindo as ciliadas.',
  },

  // ===== DIURÉTICOS DE ALÇA =====
  {
    id: 26,
    s: 'Furosemide',
    generic: 'Furosemida',
    c: 'Diurético de Alça',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Risco alto com infusão IV rápida (>25mg/min). Pode ser PERMANENTE se IR ou IV rápido.' },
    n: {
      br: ['Furosemida', 'Lasix', 'Neosemid', 'Furosen'],
      us: ['Lasix', 'Furoscix'],
      fr: ['Lasilix', 'Furosémide'],
      de: ['Lasix', 'Furosemid', 'Furorese'],
      es: ['Seguril', 'Furosemida'],
      it: ['Lasix', 'Furosemide'],
    },
    i: ['Aminoglicosídeos', 'Cisplatina', 'Vancomicina'],
    rev: 'Geralmente reversível (permanente se IV rápido ou IR)',
    mech: 'Altera potencial endococlear na estria vascular, afetando a homeostase iônica da endolinfa.',
  },
  {
    id: 27,
    s: 'Bumetanide',
    generic: 'Bumetanida',
    c: 'Diurético de Alça',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Perfil de ototoxicidade similar à furosemida.' },
    n: {
      br: ['Bumetanida', 'Burinax'],
      us: ['Bumex'],
      fr: ['Burinex'],
      de: ['Burinex'],
      es: ['Fordiuran'],
      it: ['Burinex'],
    },
    i: ['Aminoglicosídeos', 'Cisplatina'],
    rev: 'Reversível',
    mech: 'Mesmo mecanismo da furosemida - inibição do co-transportador Na-K-2Cl na estria vascular.',
  },
  {
    id: 28,
    s: 'Ethacrynic Acid',
    generic: 'Ácido Etacrínico',
    c: 'Diurético de Alça',
    r: 'HIGH',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Historicamente MAIS TÓXICO que furosemida. Evitar se possível.' },
    n: {
      br: ['Ácido Etacrínico', 'Edecrin'],
      us: ['Edecrin'],
      fr: ['Edécrine'],
      de: ['Hydromedin'],
      es: ['Edecrin'],
      it: ['Reomax'],
    },
    i: ['Aminoglicosídeos'],
    rev: 'Reversível (mas maior risco de permanência)',
    mech: 'Mais tóxico para estria vascular que outros diuréticos de alça.',
  },
  {
    id: 29,
    s: 'Torsemide',
    generic: 'Torasemida',
    c: 'Diurético de Alça',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Considerado ter menor ototoxicidade entre os diuréticos de alça.' },
    n: {
      br: ['Torasemida'],
      us: ['Demadex', 'Soaanz'],
      fr: ['Torémifène'],
      de: ['Torasemid', 'Torem'],
      es: ['Dilutol', 'Sutril'],
      it: ['Torasemide'],
    },
    i: ['Aminoglicosídeos'],
    rev: 'Reversível',
    mech: 'Mesmo mecanismo, porém menor penetração na estria vascular.',
  },

  // ===== ANTI-INFLAMATÓRIOS (AINEs) =====
  {
    id: 30,
    s: 'Aspirin',
    generic: 'Ácido Acetilsalicílico',
    c: 'AINE / Salicilato',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Zumbido/Perda',
    g: { m: [], note: 'Doses altas (>2g/dia) causam zumbido e perda auditiva reversível.' },
    n: {
      br: ['AAS', 'Aspirina', 'Bufferin', 'Melhoral', 'Somalgin'],
      us: ['Bayer Aspirin', 'Bufferin', 'Ecotrin'],
      fr: ['Aspirine', 'Aspégic', 'Kardégic'],
      de: ['Aspirin', 'ASS'],
      es: ['Aspirina', 'AAS', 'Adiro'],
      it: ['Aspirina', 'Vivin C', 'Cardioaspirin'],
    },
    i: [],
    rev: 'Reversível (24-72h após suspensão)',
    mech: 'Altera fluxo sanguíneo coclear e afeta função das células ciliadas externas.',
  },
  {
    id: 31,
    s: 'Ibuprofen',
    generic: 'Ibuprofeno',
    c: 'AINE',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Zumbido',
    g: { m: [], note: 'Zumbido transitório em doses elevadas. Raro.' },
    n: {
      br: ['Ibuprofeno', 'Advil', 'Alivium', 'Motrin', 'Ibupril'],
      us: ['Advil', 'Motrin', 'Nuprin'],
      fr: ['Advil', 'Nurofen', 'Brufen'],
      de: ['Ibuprofen', 'Nurofen', 'Dolormin'],
      es: ['Ibuprofeno', 'Neobrufen', 'Espidifen'],
      it: ['Brufen', 'Moment', 'Nurofen'],
    },
    i: [],
    rev: 'Reversível',
    mech: 'Inibição de prostaglandinas cocleares.',
  },
  {
    id: 32,
    s: 'Naproxen',
    generic: 'Naproxeno',
    c: 'AINE',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Zumbido',
    g: { m: [], note: 'Zumbido ocasional em doses elevadas.' },
    n: {
      br: ['Naproxeno', 'Flanax', 'Naprosyn', 'Naprofen'],
      us: ['Aleve', 'Naprosyn', 'Anaprox', 'Naprelan'],
      fr: ['Apranax', 'Naprosyne'],
      de: ['Naproxen', 'Dolormin'],
      es: ['Naproxeno', 'Antalgin'],
      it: ['Naprosyn', 'Momendol', 'Synflex'],
    },
    i: [],
    rev: 'Reversível',
    mech: 'Inibição de prostaglandinas.',
  },
  {
    id: 33,
    s: 'Diclofenac',
    generic: 'Diclofenaco',
    c: 'AINE',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Zumbido',
    g: { m: [], note: 'Zumbido ocasional.' },
    n: {
      br: ['Diclofenaco', 'Voltaren', 'Cataflan', 'Biofenac', 'Artren'],
      us: ['Voltaren', 'Cataflam', 'Zipsor', 'Cambia'],
      fr: ['Voltarène', 'Flector'],
      de: ['Voltaren', 'Diclofenac'],
      es: ['Voltaren', 'Diclofenaco'],
      it: ['Voltaren', 'Dicloreum'],
    },
    i: [],
    rev: 'Reversível',
    mech: 'Inibição de COX.',
  },
  {
    id: 34,
    s: 'Indomethacin',
    generic: 'Indometacina',
    c: 'AINE',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Zumbido/Perda',
    g: { m: [], note: 'Pode causar zumbido e perda auditiva em uso prolongado.' },
    n: {
      br: ['Indometacina', 'Indocid'],
      us: ['Indocin', 'Tivorbex'],
      fr: ['Indocid', 'Chrono-Indocid'],
      de: ['Indometacin', 'Indo-CT'],
      es: ['Indomethacin', 'Indocid'],
      it: ['Indometacina', 'Liometacen'],
    },
    i: [],
    rev: 'Reversível',
    mech: 'Inibição potente de COX.',
  },
  {
    id: 35,
    s: 'Piroxicam',
    generic: 'Piroxicam',
    c: 'AINE',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Zumbido',
    g: { m: [], note: 'Zumbido ocasional.' },
    n: {
      br: ['Piroxicam', 'Feldene', 'Inflamene'],
      us: ['Feldene'],
      fr: ['Feldène', 'Brexin'],
      de: ['Piroxicam', 'Felden'],
      es: ['Feldene', 'Piroxicam'],
      it: ['Feldene', 'Brexidol'],
    },
    i: [],
    rev: 'Reversível',
    mech: 'Inibição de prostaglandinas.',
  },
  {
    id: 36,
    s: 'Ketorolac',
    generic: 'Cetorolaco',
    c: 'AINE',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Zumbido',
    g: { m: [], note: 'Zumbido transitório.' },
    n: {
      br: ['Cetorolaco', 'Toragesic', 'Toradol'],
      us: ['Toradol', 'Sprix'],
      fr: ['Toradol'],
      de: ['Ketorolac'],
      es: ['Toradol', 'Droal'],
      it: ['Toradol', 'Lixidol'],
    },
    i: [],
    rev: 'Reversível',
    mech: 'Potente inibidor de COX.',
  },

  // ===== ANTIMALÁRICOS =====
  {
    id: 37,
    s: 'Quinine',
    generic: 'Quinino',
    c: 'Antimalárico',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Zumbido/Perda',
    g: { m: [], note: 'Cinchonismo: zumbido, perda auditiva, vertigem, cefaleia.' },
    n: {
      br: ['Quinino', 'Quinina'],
      us: ['Qualaquin'],
      fr: ['Quinine', 'Quinimax'],
      de: ['Chinin', 'Limptar'],
      es: ['Quinina'],
      it: ['Chinino'],
    },
    i: ['Mefloquina'],
    rev: 'Geralmente reversível',
    mech: 'Vasoconstrição coclear e efeito direto nas células ciliadas.',
  },
  {
    id: 38,
    s: 'Chloroquine',
    generic: 'Cloroquina',
    c: 'Antimalárico/Imunomodulador',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Uso crônico (>5 anos) aumenta risco. Monitorar audiometria.' },
    n: {
      br: ['Cloroquina', 'Aralen'],
      us: ['Aralen'],
      fr: ['Nivaquine'],
      de: ['Resochin'],
      es: ['Resochin'],
      it: ['Clorochina'],
    },
    i: ['Aminoglicosídeos'],
    rev: 'Parcialmente irreversível',
    mech: 'Acúmulo em tecidos com melanina, incluindo ouvido interno.',
  },
  {
    id: 39,
    s: 'Hydroxychloroquine',
    generic: 'Hidroxicloroquina',
    c: 'Antimalárico/Imunomodulador',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Coclear',
    g: { m: [], note: 'Menor risco que cloroquina. Monitorar em uso prolongado para AR e LES.' },
    n: {
      br: ['Hidroxicloroquina', 'Plaquinol', 'Reuquinol'],
      us: ['Plaquenil'],
      fr: ['Plaquenil'],
      de: ['Quensyl'],
      es: ['Dolquine'],
      it: ['Plaquenil'],
    },
    i: [],
    rev: 'Parcialmente irreversível',
    mech: 'Similar à cloroquina, porém com menor toxicidade.',
  },

  // ===== BIOLÓGICOS / IMUNOTERAPIA =====
  {
    id: 40,
    s: 'Teprotumumab',
    generic: 'Teprotumumab',
    c: 'Biológico (Anti-IGF-1R)',
    r: 'CRITICAL',
    t: ['Cochleotoxicity'],
    damage: 'Coclear/Zumbido',
    g: { m: [], note: 'MONITORAR AUDIOMETRIA antes, durante e após. Alta incidência de ototoxicidade.' },
    n: {
      br: ['Teprotumumab', 'Tepezza'],
      us: ['Tepezza'],
      fr: ['Tepezza'],
      de: ['Tepezza'],
      es: ['Tepezza'],
      it: ['Tepezza'],
    },
    i: [],
    rev: 'Mista/Potencialmente irreversível',
    mech: 'Inibição do receptor IGF-1R afeta células da cóclea. Mecanismo em estudo.',
  },
  {
    id: 41,
    s: 'Pembrolizumab',
    generic: 'Pembrolizumabe',
    c: 'Imunoterápico (Anti-PD-1)',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Autoimune',
    g: { m: [], note: 'Perda auditiva imunomediada. TRATAR COMO DOENÇA AUTOIMUNE com corticoide.' },
    n: {
      br: ['Pembrolizumabe', 'Keytruda'],
      us: ['Keytruda'],
      fr: ['Keytruda'],
      de: ['Keytruda'],
      es: ['Keytruda'],
      it: ['Keytruda'],
    },
    i: ['Outros ICI'],
    rev: 'Reversível com corticoide',
    mech: 'Ativação imune pode causar inflamação autoimune da cóclea.',
  },
  {
    id: 42,
    s: 'Nivolumab',
    generic: 'Nivolumabe',
    c: 'Imunoterápico (Anti-PD-1)',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Autoimune',
    g: { m: [], note: 'Mesmo perfil do pembrolizumabe. Perda auditiva imunomediada.' },
    n: {
      br: ['Nivolumabe', 'Opdivo'],
      us: ['Opdivo'],
      fr: ['Opdivo'],
      de: ['Opdivo'],
      es: ['Opdivo'],
      it: ['Opdivo'],
    },
    i: ['Outros ICI'],
    rev: 'Reversível com corticoide',
    mech: 'Ativação imune com potencial inflamação coclear autoimune.',
  },
  {
    id: 43,
    s: 'Interferon',
    generic: 'Interferon (Alfa/Beta)',
    c: 'Imunomodulador',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Neuro/Coclear',
    g: { m: [], note: 'Perda auditiva neurossensorial relatada. Mecanismo neurotóxico.' },
    n: {
      br: ['Interferon alfa', 'Intron A', 'Roferon', 'Rebif', 'Avonex'],
      us: ['Intron A', 'Roferon-A', 'Rebif', 'Avonex', 'Betaseron'],
      fr: ['Introna', 'Roféron', 'Rebif'],
      de: ['Intron A', 'Roferon', 'Rebif'],
      es: ['Intron A', 'Rebif'],
      it: ['Intron A', 'Rebif'],
    },
    i: [],
    rev: 'Parcialmente irreversível',
    mech: 'Efeitos neurotóxicos diretos e possível mecanismo autoimune.',
  },

  // ===== DIVERSOS =====
  {
    id: 44,
    s: 'Sildenafil',
    generic: 'Sildenafila',
    c: 'Inibidor de PDE5',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Perda Súbita',
    g: { m: [], note: 'Evento RARO. Casos de SSNHL (perda súbita) relatados ao FDA.' },
    n: {
      br: ['Sildenafila', 'Viagra', 'Pramil', 'Helleva', 'Erectalis'],
      us: ['Viagra', 'Revatio'],
      fr: ['Viagra'],
      de: ['Viagra'],
      es: ['Viagra'],
      it: ['Viagra'],
    },
    i: [],
    rev: 'Incerto (pode ser permanente)',
    mech: 'Possível alteração do fluxo sanguíneo coclear. Mecanismo não confirmado.',
  },
  {
    id: 45,
    s: 'Tadalafil',
    generic: 'Tadalafila',
    c: 'Inibidor de PDE5',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Perda Súbita',
    g: { m: [], note: 'Evento RARO. Mesmo perfil do sildenafil.' },
    n: {
      br: ['Tadalafila', 'Cialis', 'Tadalaila', 'Erectalis'],
      us: ['Cialis', 'Adcirca'],
      fr: ['Cialis'],
      de: ['Cialis'],
      es: ['Cialis'],
      it: ['Cialis'],
    },
    i: [],
    rev: 'Incerto (pode ser permanente)',
    mech: 'Semelhante ao sildenafil.',
  },
  {
    id: 46,
    s: 'Omeprazole',
    generic: 'Omeprazol',
    c: 'Inibidor de Bomba de Prótons',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Perda (Associação)',
    g: { m: [], note: 'Associação epidemiológica em estudos observacionais. Causalidade NÃO confirmada.' },
    n: {
      br: ['Omeprazol', 'Losec', 'Peprazol', 'Omep', 'Gastrium'],
      us: ['Prilosec', 'Zegerid'],
      fr: ['Mopral', 'Oméprazole'],
      de: ['Omeprazol', 'Antra', 'Omep'],
      es: ['Omeprazol', 'Losec', 'Parizac'],
      it: ['Omeprazen', 'Antra', 'Losec'],
    },
    i: [],
    rev: 'Incerto',
    mech: 'Mecanismo não estabelecido. Possível alteração de absorção de micronutrientes.',
  },
  {
    id: 47,
    s: 'Carvedilol',
    generic: 'Carvedilol',
    c: 'Betabloqueador',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Perda (Associação)',
    g: { m: [], note: 'Associação epidemiológica fraca. Causalidade NÃO confirmada.' },
    n: {
      br: ['Carvedilol', 'Coreg', 'Divelol'],
      us: ['Coreg', 'Coreg CR'],
      fr: ['Kredex', 'Carvedilol'],
      de: ['Carvedilol', 'Dilatrend'],
      es: ['Coropres'],
      it: ['Carvedilolo', 'Dilatrend'],
    },
    i: [],
    rev: 'Incerto',
    mech: 'Mecanismo não estabelecido.',
  },
  {
    id: 48,
    s: 'Sertraline',
    generic: 'Sertralina',
    c: 'Antidepressivo (ISRS)',
    r: 'WEAK',
    t: ['Cochleotoxicity'],
    damage: 'Zumbido',
    g: { m: [], note: 'Zumbido como efeito colateral em 1-2% dos pacientes. Geralmente transitório.' },
    n: {
      br: ['Sertralina', 'Zoloft', 'Assert', 'Serenata', 'Tolrest'],
      us: ['Zoloft'],
      fr: ['Zoloft'],
      de: ['Zoloft', 'Sertralin'],
      es: ['Besitran', 'Aremis'],
      it: ['Zoloft', 'Tatig'],
    },
    i: [],
    rev: 'Reversível',
    mech: 'Alteração de neurotransmissores na via auditiva central.',
  },
  {
    id: 49,
    s: 'Deferoxamine',
    generic: 'Desferroxamina',
    c: 'Quelante de Ferro',
    r: 'MODERATE',
    t: ['Cochleotoxicity'],
    damage: 'Neuro/Coclear',
    g: { m: [], note: 'Monitorar audiometria em tratamentos prolongados. Dose-dependente.' },
    n: {
      br: ['Desferroxamina', 'Desferal'],
      us: ['Desferal'],
      fr: ['Desféral'],
      de: ['Desferal'],
      es: ['Desferin'],
      it: ['Desferal'],
    },
    i: ['Vitamina C em altas doses'],
    rev: 'Parcialmente reversível',
    mech: 'Quelação de ferro pode afetar metabolismo das células ciliadas.',
  },
]

// Lista de medicamentos comuns SEM ototoxicidade documentada significativa
// Isso permite diferenciar "não encontrado" de "sem registro de ototoxicidade"
const safeMeds = [
  // Antibióticos seguros
  {
    name: 'Amoxicilina',
    aliases: ['Amoxil', 'Novocilin', 'Amoxicillin', 'Clavulin', 'Amoxicilina + Clavulanato', 'Augmentin'],
  },
  { name: 'Penicilina', aliases: ['Benzetacil', 'Pen-Ve-Oral', 'Penicillin'] },
  { name: 'Cefalexina', aliases: ['Keflex', 'Cefalexin'] },
  { name: 'Ceftriaxona', aliases: ['Rocefin', 'Ceftriaxone', 'Triaxon'] },
  { name: 'Cefuroxima', aliases: ['Zinnat', 'Cefuroxime'] },
  { name: 'Ciprofloxacino', aliases: ['Cipro', 'Ciprofloxacin', 'Procin'] },
  { name: 'Levofloxacino', aliases: ['Levaquin', 'Levofloxacin', 'Tavanic'] },
  { name: 'Metronidazol', aliases: ['Flagyl', 'Metronidazole'] },
  { name: 'Sulfametoxazol + Trimetoprima', aliases: ['Bactrim', 'Septra', 'Cotrimoxazol'] },
  { name: 'Doxiciclina', aliases: ['Vibramicina', 'Doxycycline'] },
  { name: 'Clindamicina', aliases: ['Dalacin', 'Clindamycin', 'Cleocin'] },

  // Anti-hipertensivos
  { name: 'Losartana', aliases: ['Losartan', 'Cozaar', 'Aradois'] },
  { name: 'Enalapril', aliases: ['Renitec', 'Vasotec'] },
  { name: 'Captopril', aliases: ['Capoten'] },
  { name: 'Lisinopril', aliases: ['Zestril', 'Prinivil'] },
  { name: 'Anlodipino', aliases: ['Amlodipine', 'Norvasc', 'Pressat'] },
  { name: 'Atenolol', aliases: ['Tenormin', 'Atenol'] },
  { name: 'Propranolol', aliases: ['Inderal'] },
  { name: 'Metoprolol', aliases: ['Lopressor', 'Seloken'] },
  { name: 'Hidroclorotiazida', aliases: ['Hydrochlorothiazide', 'HCTZ', 'Clorana'] },
  { name: 'Valsartana', aliases: ['Valsartan', 'Diovan', 'Tareg'] },
  { name: 'Ramipril', aliases: ['Altace', 'Triatec'] },

  // Antidiabéticos
  { name: 'Metformina', aliases: ['Metformin', 'Glucophage', 'Glifage'] },
  { name: 'Glibenclamida', aliases: ['Glyburide', 'Daonil'] },
  { name: 'Glimepirida', aliases: ['Glimepiride', 'Amaryl'] },
  { name: 'Sitagliptina', aliases: ['Sitagliptin', 'Januvia'] },
  { name: 'Empagliflozina', aliases: ['Empagliflozin', 'Jardiance'] },
  { name: 'Dapagliflozina', aliases: ['Dapagliflozin', 'Forxiga'] },
  { name: 'Liraglutida', aliases: ['Liraglutide', 'Victoza', 'Saxenda'] },
  { name: 'Insulina', aliases: ['Insulin', 'Lantus', 'Novorapid', 'Humalog', 'Tresiba'] },

  // Estatinas e cardiovasculares
  { name: 'Sinvastatina', aliases: ['Simvastatin', 'Zocor'] },
  { name: 'Atorvastatina', aliases: ['Atorvastatin', 'Lipitor', 'Citalor'] },
  { name: 'Rosuvastatina', aliases: ['Rosuvastatin', 'Crestor'] },
  { name: 'Pravastatina', aliases: ['Pravastatin', 'Pravacol'] },
  { name: 'Ezetimiba', aliases: ['Ezetimibe', 'Zetia'] },
  { name: 'Varfarina', aliases: ['Warfarin', 'Coumadin', 'Marevan'] },
  { name: 'Rivaroxabana', aliases: ['Rivaroxaban', 'Xarelto'] },
  { name: 'Apixabana', aliases: ['Apixaban', 'Eliquis'] },
  { name: 'AAS baixa dose', aliases: ['Aspirina Prevent', 'Aspirina 100mg'] },
  { name: 'Clopidogrel', aliases: ['Plavix'] },

  // Antidepressivos (além dos já listados com risco)
  { name: 'Escitalopram', aliases: ['Lexapro', 'Cipralex'] },
  { name: 'Paroxetina', aliases: ['Paroxetine', 'Paxil', 'Pondera', 'Aropax'] },
  { name: 'Venlafaxina', aliases: ['Venlafaxine', 'Effexor', 'Venlift'] },
  { name: 'Duloxetina', aliases: ['Duloxetine', 'Cymbalta', 'Velija'] },
  { name: 'Bupropiona', aliases: ['Bupropion', 'Wellbutrin', 'Zetron'] },
  { name: 'Mirtazapina', aliases: ['Mirtazapine', 'Remeron'] },
  { name: 'Trazodona', aliases: ['Trazodone', 'Desyrel', 'Donaren'] },

  // Ansiolíticos e hipnóticos
  { name: 'Alprazolam', aliases: ['Xanax', 'Frontal'] },
  { name: 'Clonazepam', aliases: ['Rivotril', 'Klonopin'] },
  { name: 'Diazepam', aliases: ['Valium'] },
  { name: 'Lorazepam', aliases: ['Ativan', 'Lorax'] },
  { name: 'Zolpidem', aliases: ['Ambien', 'Stilnox'] },

  // Anticonvulsivantes
  { name: 'Carbamazepina', aliases: ['Carbamazepine', 'Tegretol'] },
  { name: 'Valproato', aliases: ['Depakene', 'Depakote', 'Valproic Acid', 'Ácido Valproico'] },
  { name: 'Lamotrigina', aliases: ['Lamotrigine', 'Lamictal'] },
  { name: 'Levetiracetam', aliases: ['Keppra'] },
  { name: 'Topiramato', aliases: ['Topiramate', 'Topamax'] },
  { name: 'Gabapentina', aliases: ['Gabapentin', 'Neurontin'] },
  { name: 'Pregabalina', aliases: ['Pregabalin', 'Lyrica'] },
  { name: 'Fenitoína', aliases: ['Phenytoin', 'Dilantin', 'Hidantal'] },

  // Corticoides
  { name: 'Prednisona', aliases: ['Prednisone', 'Meticorten'] },
  { name: 'Prednisolona', aliases: ['Prednisolone', 'Prelone'] },
  { name: 'Dexametasona', aliases: ['Dexamethasone', 'Decadron'] },
  { name: 'Hidrocortisona', aliases: ['Hydrocortisone', 'Cortef', 'Solu-Cortef'] },
  { name: 'Metilprednisolona', aliases: ['Methylprednisolone', 'Solu-Medrol'] },
  { name: 'Betametasona', aliases: ['Betamethasone', 'Celestone'] },

  // Anti-histamínicos
  { name: 'Loratadina', aliases: ['Loratadine', 'Claritin'] },
  { name: 'Cetirizina', aliases: ['Cetirizine', 'Zyrtec'] },
  { name: 'Fexofenadina', aliases: ['Fexofenadine', 'Allegra'] },
  { name: 'Desloratadina', aliases: ['Desloratadine', 'Clarinex', 'Desalex'] },
  { name: 'Difenidramina', aliases: ['Diphenhydramine', 'Benadryl'] },
  { name: 'Hidroxizina', aliases: ['Hydroxyzine', 'Atarax', 'Hixizine'] },

  // Gastrointestinais (além do omeprazol já listado)
  { name: 'Pantoprazol', aliases: ['Pantoprazole', 'Protonix', 'Pantozol'] },
  { name: 'Esomeprazol', aliases: ['Esomeprazole', 'Nexium'] },
  { name: 'Lansoprazol', aliases: ['Lansoprazole', 'Prevacid'] },
  { name: 'Ranitidina', aliases: ['Ranitidine', 'Zantac', 'Antak'] },
  { name: 'Famotidina', aliases: ['Famotidine', 'Pepcid'] },
  { name: 'Domperidona', aliases: ['Domperidone', 'Motilium'] },
  { name: 'Metoclopramida', aliases: ['Metoclopramide', 'Reglan', 'Plasil'] },
  { name: 'Ondansetrona', aliases: ['Ondansetron', 'Zofran', 'Vonau'] },
  { name: 'Loperamida', aliases: ['Loperamide', 'Imodium', 'Imosec'] },
  { name: 'Simeticona', aliases: ['Simethicone', 'Luftal', 'Gas-X'] },

  // Broncodilatadores e respiratórios
  { name: 'Salbutamol', aliases: ['Albuterol', 'Ventolin', 'Aerolin'] },
  { name: 'Formoterol', aliases: ['Foradil', 'Oxis'] },
  { name: 'Salmeterol', aliases: ['Serevent'] },
  { name: 'Budesonida', aliases: ['Budesonide', 'Pulmicort', 'Budecort'] },
  { name: 'Fluticasona', aliases: ['Fluticasone', 'Flixotide', 'Flovent'] },
  { name: 'Montelucaste', aliases: ['Montelukast', 'Singulair'] },
  { name: 'Brometo de Ipratrópio', aliases: ['Ipratropium', 'Atrovent'] },
  { name: 'Brometo de Tiotrópio', aliases: ['Tiotropium', 'Spiriva'] },
  { name: 'Acetilcisteína', aliases: ['Acetylcysteine', 'Fluimucil', 'Mucomyst'] },
  { name: 'Ambroxol', aliases: ['Mucosolvan'] },

  // Analgésicos e relaxantes musculares
  { name: 'Paracetamol', aliases: ['Acetaminophen', 'Tylenol', 'Panadol'] },
  { name: 'Dipirona', aliases: ['Metamizole', 'Novalgina', 'Anador'] },
  { name: 'Tramadol', aliases: ['Ultram', 'Tramal'] },
  { name: 'Codeína', aliases: ['Codeine', 'Tylex'] },
  { name: 'Morfina', aliases: ['Morphine', 'Dimorf'] },
  { name: 'Ciclobenzaprina', aliases: ['Cyclobenzaprine', 'Flexeril', 'Miosan'] },
  { name: 'Carisoprodol', aliases: ['Soma', 'Mioflex'] },
  { name: 'Baclofeno', aliases: ['Baclofen', 'Lioresal'] },

  // Anticoagulantes e antiagregantes
  { name: 'Enoxaparina', aliases: ['Enoxaparin', 'Lovenox', 'Clexane'] },
  { name: 'Heparina', aliases: ['Heparin', 'Liquemine'] },
  { name: 'Dabigatrana', aliases: ['Dabigatran', 'Pradaxa'] },
  { name: 'Edoxabana', aliases: ['Edoxaban', 'Lixiana'] },
  { name: 'Ticagrelor', aliases: ['Brilinta'] },
  { name: 'Prasugrel', aliases: ['Effient'] },

  // Hormônios e tireoidea
  { name: 'Levotiroxina', aliases: ['Levothyroxine', 'Synthroid', 'Puran T4', 'Euthyrox'] },
  { name: 'Propiltiouracil', aliases: ['PTU'] },
  { name: 'Metimazol', aliases: ['Methimazole', 'Tapazol'] },
  { name: 'Estrogênio', aliases: ['Estrogen', 'Premarin'] },
  { name: 'Progesterona', aliases: ['Progesterone', 'Utrogestan'] },
  { name: 'Testosterona', aliases: ['Testosterone', 'Durateston', 'Androgel'] },

  // Vitaminas e suplementos
  { name: 'Vitamina D', aliases: ['Colecalciferol', 'Vitamin D3', 'Addera', 'DePura'] },
  { name: 'Vitamina B12', aliases: ['Cianocobalamina', 'Cyanocobalamin'] },
  { name: 'Ácido Fólico', aliases: ['Folic Acid', 'Folato'] },
  { name: 'Ferro', aliases: ['Iron', 'Ferrous Sulfate', 'Sulfato Ferroso', 'Noripurum'] },
  { name: 'Cálcite', aliases: ['Calcium', 'Calcium Carbonate', 'Calcitran'] },
  { name: 'Magnésio', aliases: ['Magnesium'] },
  { name: 'Zinco', aliases: ['Zinc'] },
  { name: 'Ômega 3', aliases: ['Omega 3', 'Fish Oil'] },

  // Oftalmológicos tópicos (sem risco sistêmico)
  { name: 'Timolol colírio', aliases: ['Timolol', 'Timoptic'] },
  { name: 'Latanoprosta', aliases: ['Latanoprost', 'Xalatan'] },
  { name: 'Brimonidina', aliases: ['Brimonidine', 'Alphagan'] },

  // Dermatológicos
  { name: 'Isotretinoína', aliases: ['Isotretinoin', 'Accutane', 'Roacutan'] },
  { name: 'Finasterida', aliases: ['Finasteride', 'Propecia', 'Proscar'] },
  { name: 'Minoxidil', aliases: ['Rogaine'] },

  // Imunossupressores (sem ototoxicidade significativa)
  { name: 'Azatioprina', aliases: ['Azathioprine', 'Imuran'] },
  { name: 'Micofenolato', aliases: ['Mycophenolate', 'CellCept'] },
  { name: 'Ciclosporina', aliases: ['Cyclosporine', 'Sandimmune', 'Neoral'] },
  { name: 'Tacrolimo', aliases: ['Tacrolimus', 'Prograf'] },

  // Antivirais
  { name: 'Aciclovir', aliases: ['Acyclovir', 'Zovirax'] },
  { name: 'Valaciclovir', aliases: ['Valacyclovir', 'Valtrex'] },
  { name: 'Oseltamivir', aliases: ['Tamiflu'] },

  // Antifúngicos orais (além da anfotericina)
  { name: 'Fluconazol', aliases: ['Fluconazole', 'Diflucan', 'Zoltec'] },
  { name: 'Itraconazol', aliases: ['Itraconazole', 'Sporanox'] },
  { name: 'Terbinafina', aliases: ['Terbinafine', 'Lamisil'] },

  // Antiparasitários
  { name: 'Ivermectina', aliases: ['Ivermectin', 'Stromectol', 'Revectina'] },
  { name: 'Albendazol', aliases: ['Albendazole', 'Zentel'] },
  { name: 'Mebendazol', aliases: ['Mebendazole', 'Vermox', 'Pantelmin'] },
  { name: 'Nitazoxanida', aliases: ['Nitazoxanide', 'Annita'] },
  { name: 'Secnidazol', aliases: ['Secnidazole'] },

  // Urologicos
  { name: 'Tansulosina', aliases: ['Tamsulosin', 'Flomax', 'Secotex'] },
  { name: 'Doxazosina', aliases: ['Doxazosin', 'Cardura'] },
  { name: 'Dutasterida', aliases: ['Dutasteride', 'Avodart'] },
  { name: 'Oxibutinina', aliases: ['Oxybutynin', 'Ditropan', 'Retemic'] },
  { name: 'Solifenacina', aliases: ['Solifenacin', 'Vesicare'] },

  // Outros comuns
  { name: 'Alopurinol', aliases: ['Allopurinol', 'Zyloprim', 'Zyloric'] },
  { name: 'Colchicina', aliases: ['Colchicine'] },
  { name: 'Febuxostat', aliases: ['Febuxostate', 'Uloric'] },
  { name: 'Melatonina', aliases: ['Melatonin'] },
  { name: 'Modafinila', aliases: ['Modafinil', 'Provigil', 'Stavigile'] },
  { name: 'Naltrexona', aliases: ['Naltrexone', 'Revia'] },
  { name: 'Dissulfiram', aliases: ['Disulfiram', 'Antabuse'] },
  { name: 'Vareniclina', aliases: ['Varenicline', 'Chantix', 'Champix'] },
  { name: 'Buprenorfina', aliases: ['Buprenorphine', 'Suboxone'] },
  { name: 'Lidocaína', aliases: ['Lidocaine', 'Xylocaine'] },
  { name: 'Cetamina', aliases: ['Ketamine'] },
]

// Função para verificar se é um medicamento conhecido (ototóxico ou seguro)
function findSafeMed(searchTerm) {
  const term = searchTerm.toLowerCase().trim()
  if (term.length < 3) return null

  for (const med of safeMeds) {
    if (med.name.toLowerCase().includes(term) || term.includes(med.name.toLowerCase())) {
      return med.name
    }
    for (const alias of med.aliases) {
      if (alias.toLowerCase().includes(term) || term.includes(alias.toLowerCase())) {
        return med.name
      }
    }
  }
  return null
}

const countryFlags = {
  br: '🇧🇷',
  us: '🇺🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  it: '🇮🇹',
}

const countryNames = {
  br: 'Brasil',
  us: 'EUA',
  fr: 'França',
  de: 'Alemanha',
  es: 'Espanha',
  it: 'Itália',
}

const drugClasses = [
  'Todos',
  'Antineoplásico (Platina)',
  'Antineoplásico',
  'Antibiótico (Aminoglicosídeo)',
  'Antibiótico',
  'Diurético de Alça',
  'AINE',
  'Antimalárico',
  'Biológico/Imunoterápico',
  'Outros',
]

const translations = {
  pt: {
    title: 'OtoCheck',
    subtitle: 'Base de Dados de Ototoxicidade',
    search: 'Buscar medicamento (nome genérico ou comercial)...',
    critical: 'CRÍTICO',
    high: 'ALTO',
    moderate: 'MODERADO',
    weak: 'BAIXO',
    names: 'Nomes Comerciais',
    type: 'Tipo de Toxicidade',
    damage: 'Dano Predominante',
    alert: '⚠️ ALERTA GENÉTICO',
    risk: 'RISCO EXTREMO em portadores de mutação',
    test: 'Teste genético recomendado antes do uso',
    inter: 'Interações que aumentam ototoxicidade',
    rev: 'Reversibilidade',
    mech: 'Mecanismo',
    coch: 'Cocleotoxicidade (Perda Auditiva)',
    vest: 'Vestibulotoxicidade (Equilíbrio/Vertigem)',
    results: 'Resultados',
    none: 'Nenhum medicamento encontrado. Tente outro nome.',
    more: 'Ver todos os países',
    less: 'Mostrar menos',
    disclaimer: '⚠️ Informação educacional. Não substitui orientação médica profissional.',
    meds: 'Medicamentos',
    countries: 'Países',
    classes: 'Classes',
    filterClass: 'Filtrar por classe',
    all: 'Todos',
    hint: 'Experimente: gentamicina, cisplatina, furosemida, aspirina, viagra',
  },
  en: {
    title: 'OtoCheck',
    subtitle: 'Ototoxicity Database',
    search: 'Search medication (generic or brand name)...',
    critical: 'CRITICAL',
    high: 'HIGH',
    moderate: 'MODERATE',
    weak: 'LOW',
    names: 'Brand Names',
    type: 'Toxicity Type',
    damage: 'Primary Damage',
    alert: '⚠️ GENETIC ALERT',
    risk: 'EXTREME RISK in mutation carriers',
    test: 'Genetic testing recommended before use',
    inter: 'Interactions that increase ototoxicity',
    rev: 'Reversibility',
    mech: 'Mechanism',
    coch: 'Cochleotoxicity (Hearing Loss)',
    vest: 'Vestibulotoxicity (Balance/Vertigo)',
    results: 'Results',
    none: 'No medication found. Try another name.',
    more: 'See all countries',
    less: 'Show less',
    disclaimer: '⚠️ Educational information. Does not replace professional medical advice.',
    meds: 'Medications',
    countries: 'Countries',
    classes: 'Classes',
    filterClass: 'Filter by class',
    all: 'All',
    hint: 'Try: gentamicin, cisplatin, furosemide, aspirin, viagra',
  },
}

function NoResultsMessage({ search, lang }) {
  const safeMedFound = findSafeMed(search)

  if (safeMedFound) {
    // Medicamento reconhecido, mas sem ototoxicidade
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h4 className="text-lg font-semibold text-green-700 mb-2">
          {lang === 'pt' ? '✓ Sem registro de ototoxicidade' : '✓ No ototoxicity record'}
        </h4>
        <p className="text-gray-600 mb-3">
          <span className="font-semibold text-gray-800">{safeMedFound}</span>
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto text-sm text-green-800">
          <p>
            {lang === 'pt'
              ? 'Este medicamento não possui registro de ototoxicidade significativa na literatura médica pesquisada. Pode ser utilizado sem preocupação específica com a audição.'
              : 'This medication has no significant ototoxicity record in the medical literature reviewed. It can be used without specific concern for hearing.'}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-4 italic">
          {lang === 'pt'
            ? '* Sempre consulte um profissional de saúde. Esta informação não substitui avaliação médica.'
            : '* Always consult a healthcare professional. This information does not replace medical evaluation.'}
        </p>
      </div>
    )
  }

  // Termo não reconhecido
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h4 className="text-lg font-semibold text-gray-700 mb-2">
        {lang === 'pt' ? 'Medicamento não encontrado' : 'Medication not found'}
      </h4>
      <p className="text-gray-500 mb-4">"{search}"</p>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto text-sm text-amber-800">
        <p className="font-medium mb-2">{lang === 'pt' ? '💡 Sugestões:' : '💡 Suggestions:'}</p>
        <ul className="text-left space-y-1">
          <li>• {lang === 'pt' ? 'Verifique a grafia do medicamento' : 'Check the medication spelling'}</li>
          <li>• {lang === 'pt' ? 'Tente o nome genérico ou comercial' : 'Try the generic or brand name'}</li>
          <li>• {lang === 'pt' ? 'Use o nome em português ou inglês' : 'Use the name in Portuguese or English'}</li>
        </ul>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        {lang === 'pt'
          ? 'Se o medicamento não está na base, consulte a bula ou um profissional de saúde.'
          : 'If the medication is not in the database, consult the package insert or a healthcare professional.'}
      </p>
    </div>
  )
}

function MedCard({ med, expanded, setExpanded, lang }) {
  const t = translations[lang]

  const riskColors = {
    CRITICAL: 'bg-red-100 text-red-800 border-red-300',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-300',
    MODERATE: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    WEAK: 'bg-green-100 text-green-800 border-green-300',
  }

  const riskIcons = {
    CRITICAL: '🔴🔴🔴🔴',
    HIGH: '🟠🟠🟠',
    MODERATE: '🟡🟡',
    WEAK: '🟢',
  }

  const allCountries = Object.entries(med.n)
  const visibleCountries = expanded ? allCountries : allCountries.slice(0, 2)

  return (
    <div className="border-2 border-gray-200 rounded-xl p-5 bg-white hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div>
          <h4 className="text-xl font-bold text-gray-900">{med.generic || med.s}</h4>
          <p className="text-sm text-gray-500">{med.s !== med.generic && `(${med.s})`}</p>
          <p className="text-xs text-teal-600 font-medium mt-1 flex items-center gap-1">
            <Pill className="w-3 h-3" />
            {med.c}
          </p>
        </div>
        <div
          className={`${
            riskColors[med.r]
          } border-2 px-3 py-2 rounded-lg font-bold text-xs whitespace-nowrap self-start`}
        >
          {riskIcons[med.r]} {t[med.r.toLowerCase()]}
        </div>
      </div>

      {/* Damage Type */}
      <div className="mb-3 bg-gray-50 rounded-lg p-3">
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-700">{t.damage}: </span>
            <span className="text-gray-600">{med.damage}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">{t.rev}: </span>
            <span className={`${med.rev.includes('Irreversível') ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
              {med.rev}
            </span>
          </div>
        </div>
      </div>

      {/* Toxicity Type Icons */}
      <div className="mb-3">
        <div className="flex flex-wrap gap-2">
          {med.t.map(type => (
            <span
              key={type}
              className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                type === 'Cochleotoxicity' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              {type === 'Cochleotoxicity' ? '👂 Coclear' : '🌀 Vestibular'}
            </span>
          ))}
        </div>
      </div>

      {/* Genetic Alert */}
      {med.g.m && med.g.m.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 mb-3">
          <h5 className="font-bold text-red-800 mb-1 text-sm">{t.alert}</h5>
          <p className="text-xs text-red-700 mb-1">
            <strong>{t.risk}:</strong> {med.g.m.join(', ')}
          </p>
          <p className="text-xs text-red-600 font-medium">✓ {t.test}</p>
        </div>
      )}

      {/* Clinical Notes */}
      {med.g.note && (
        <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800">
            <strong>📋 Nota clínica:</strong> {med.g.note}
          </p>
        </div>
      )}

      {/* Mechanism */}
      {med.mech && (
        <div className="mb-3 bg-blue-50 rounded-lg p-3">
          <h5 className="font-semibold text-blue-800 mb-1 flex items-center gap-1 text-xs">
            <Beaker className="w-3 h-3" />
            {t.mech}:
          </h5>
          <p className="text-xs text-blue-700">{med.mech}</p>
        </div>
      )}

      {/* Interactions */}
      {med.i && med.i.length > 0 && (
        <div className="mb-3">
          <h5 className="font-semibold text-gray-700 mb-1 flex items-center gap-1 text-xs">
            <AlertTriangle className="w-3 h-3 text-yellow-600" />
            {t.inter}:
          </h5>
          <div className="flex flex-wrap gap-1">
            {med.i.map(drug => (
              <span key={drug} className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium">
                {drug}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Commercial Names */}
      <div className="border-t pt-3">
        <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-1 text-xs">
          <Globe className="w-3 h-3" />
          {t.names}:
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {visibleCountries.map(([country, names]) => (
            <div key={country} className="text-xs bg-gray-50 rounded p-1.5">
              <span className="font-medium">
                {countryFlags[country]} {countryNames[country]}:
              </span>
              <span className="ml-1 text-gray-600">
                {names.slice(0, 3).join(', ')}
                {names.length > 3 ? '...' : ''}
              </span>
            </div>
          ))}
        </div>
        {allCountries.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-teal-600 hover:text-teal-800 text-xs mt-2 flex items-center gap-1 font-medium"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3" /> {t.less}
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" /> {t.more}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default function OtoCheck() {
  const [search, setSearch] = useState('')
  const [expandedCards, setExpandedCards] = useState({})
  const [lang, setLang] = useState('pt')
  const [classFilter, setClassFilter] = useState('Todos')

  const t = translations[lang]

  const filtered = useMemo(() => {
    let results = meds

    // Filter by class
    if (classFilter !== 'Todos') {
      results = results.filter(med => {
        if (classFilter === 'Outros') {
          return !drugClasses
            .slice(1, -1)
            .some(c => med.c.includes(c.replace('Antibiótico (Aminoglicosídeo)', 'Aminoglicosídeo')))
        }
        return med.c
          .toLowerCase()
          .includes(classFilter.toLowerCase().replace('antibiótico (aminoglicosídeo)', 'aminoglicosídeo'))
      })
    }

    // Filter by search
    if (search.trim()) {
      const term = search.toLowerCase().trim()
      results = results.filter(med => {
        if (med.s.toLowerCase().includes(term)) return true
        if (med.generic && med.generic.toLowerCase().includes(term)) return true
        if (med.c.toLowerCase().includes(term)) return true
        for (const names of Object.values(med.n)) {
          if (names.some(n => n.toLowerCase().includes(term))) return true
        }
        return false
      })
    }

    // Sort by risk
    return results.sort((a, b) => {
      const riskOrder = { CRITICAL: 0, HIGH: 1, MODERATE: 2, WEAK: 3 }
      return riskOrder[a.r] - riskOrder[b.r]
    })
  }, [search, classFilter])

  const stats = useMemo(
    () => ({
      ototoxic: meds.length,
      safe: safeMeds.length,
      total: meds.length + safeMeds.length,
      countries: Object.keys(countryFlags).length,
    }),
    []
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <a
              href="https://portalotorrino.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2 text-sm"
            >
              <span className="font-semibold">Portal Otorrino</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="flex gap-2">
              <button
                onClick={() => setLang('pt')}
                className={`px-2 py-1 rounded text-xs font-medium transition ${
                  lang === 'pt' ? 'bg-white text-teal-700' : 'bg-teal-500 hover:bg-teal-400'
                }`}
              >
                🇧🇷 PT
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded text-xs font-medium transition ${
                  lang === 'en' ? 'bg-white text-teal-700' : 'bg-teal-500 hover:bg-teal-400'
                }`}
              >
                🇺🇸 EN
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-sm text-gray-600">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Search Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.ototoxic}</div>
                  <div className="text-xs text-gray-600">{lang === 'pt' ? 'Ototóxicos' : 'Ototoxic'}</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.safe}</div>
                  <div className="text-xs text-gray-600">{lang === 'pt' ? 'Seguros' : 'Safe'}</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.countries}</div>
                  <div className="text-xs text-gray-600">{lang === 'pt' ? 'Países' : 'Countries'}</div>
                </div>
              </div>

              {/* Search Input */}
              <div className="relative mb-3">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.search}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base transition-all"
                  autoFocus
                />
              </div>

              {/* Class Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{t.filterClass}:</span>
                <select
                  value={classFilter}
                  onChange={e => setClassFilter(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-teal-500"
                >
                  {drugClasses.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-3 text-xs text-gray-500">💡 {t.hint}</p>
            </div>

            {/* Results */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {t.results}
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">{filtered.length}</span>
              </h3>

              {filtered.length === 0 ? (
                <NoResultsMessage search={search} lang={lang} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map(med => (
                    <MedCard
                      key={med.id}
                      med={med}
                      expanded={expandedCards[med.id]}
                      setExpanded={val => setExpandedCards({ ...expandedCards, [med.id]: val })}
                      lang={lang}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Ad Placeholder */}
            <div className="bg-gray-100 rounded-xl p-4 h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-400">
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">📊</div>
                <p className="text-sm font-medium">Google AdSense</p>
                <p className="text-xs">300x250</p>
              </div>
            </div>

            {/* Risk Legend */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                <Info className="w-4 h-4" />
                {lang === 'pt' ? 'Níveis de Risco' : 'Risk Levels'}
              </h3>
              <div className="space-y-2 text-xs">
                <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-2">
                  <div className="font-bold">🔴🔴🔴🔴 {t.critical}</div>
                  <div className="mt-0.5 opacity-80">
                    {lang === 'pt' ? 'Perda auditiva permanente provável' : 'Permanent hearing loss likely'}
                  </div>
                </div>
                <div className="bg-orange-100 text-orange-800 border border-orange-300 rounded-lg p-2">
                  <div className="font-bold">🟠🟠🟠 {t.high}</div>
                  <div className="mt-0.5 opacity-80">
                    {lang === 'pt' ? 'Risco significativo, monitorar' : 'Significant risk, monitor'}
                  </div>
                </div>
                <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg p-2">
                  <div className="font-bold">🟡🟡 {t.moderate}</div>
                  <div className="mt-0.5 opacity-80">
                    {lang === 'pt' ? 'Risco moderado, cautela' : 'Moderate risk, caution'}
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg p-2">
                  <div className="font-bold">🟢 {t.weak}</div>
                  <div className="mt-0.5 opacity-80">
                    {lang === 'pt' ? 'Risco baixo, casos raros' : 'Low risk, rare cases'}
                  </div>
                </div>
              </div>
            </div>

            {/* Toxicity Types */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                {lang === 'pt' ? 'Tipos de Toxicidade' : 'Toxicity Types'}
              </h3>
              <div className="space-y-2 text-xs">
                <div className="bg-purple-50 text-purple-700 rounded-lg p-2 flex items-center gap-2">
                  <span>👂</span>
                  <div>
                    <div className="font-semibold">{lang === 'pt' ? 'Cocleotoxicidade' : 'Cochleotoxicity'}</div>
                    <div className="opacity-80">{lang === 'pt' ? 'Afeta audição' : 'Affects hearing'}</div>
                  </div>
                </div>
                <div className="bg-blue-50 text-blue-700 rounded-lg p-2 flex items-center gap-2">
                  <span>🌀</span>
                  <div>
                    <div className="font-semibold">{lang === 'pt' ? 'Vestibulotoxicidade' : 'Vestibulotoxicity'}</div>
                    <div className="opacity-80">{lang === 'pt' ? 'Afeta equilíbrio' : 'Affects balance'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              <p className="font-medium">{t.disclaimer}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 OtoCheck | {lang === 'pt' ? 'Desenvolvido por' : 'Developed by'}{' '}
            <a href="https://portalotorrino.com.br" className="text-teal-400 hover:underline">
              Portal Otorrino
            </a>
          </p>
          <p className="text-xs mt-2 text-gray-500">Dr. Luciano Moreira - Otorrinolaringologista - CRM-RJ 52.73329-8</p>
        </div>
      </footer>
    </div>
  )
}
