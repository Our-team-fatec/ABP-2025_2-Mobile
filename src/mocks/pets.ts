export const pets: {
    name: string;
    breed: string;
    gender: string;
    age: string;
    weight?: string;
    image: any;
    status: {
      label: string;
      type: "vacinacao" | "consulta" | "aviso" | "pendente";
    }[];
  }[] = [
    {
      name: "Buddy",
      breed: "Golden Retriever",
      gender: "Macho",
      age: "2 anos e 8 meses",
      weight: "25kg",
      image: require("../../assets/buddy.jpg"),
      status: [
        { label: "✅ Vacinação em dia", type: "vacinacao" },
        { label: "Consulta Agendada 31/01/2025", type: "aviso" },
        { label: "Última Consulta 01/12/2024", type: "consulta" },
      ],
    },
    {
      name: "Luna",
      breed: "SRD",
      gender: "Fêmea",
      age: "6 meses",
      weight: "3kg",
      image: require("../../assets/neguinho.jpg"),
      status: [
        { label: "⚠️ Vacina pendente", type: "pendente" },
        { label: "Última Consulta 01/12/2024", type: "consulta" },
      ],
    },
  ];