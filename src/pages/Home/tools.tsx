import {
  FaUserSecret,
  FaObjectGroup,
  FaFileArchive,
  FaExchangeAlt,
  FaLock,
  FaFileExport,
  FaSort,
  FaEdit,
} from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

export const tools = [
  {
    title: "Anonymiser PDF",
    description:
      "Anonymisez ou pseudonymisez vos documents PDF de manière sécurisée.",
    icon: <FaUserSecret color="rgb(103 165 105)" />,
    route: "/anonymiser-pdf",
    haveToLogin: true,
  },
  {
    title: "Diviser PDF",
    description: "Divisez des fichiers PDF en plusieurs fichiers plus petits.",
    icon: <FaScissors color="#F44336" />,
    route: "/diviser-pdf",
    haveToLogin: false,
  },
  {
    title: "Fusionner PDF",
    description: "Combinez plusieurs fichiers PDF en un seul document unifié.",
    icon: <FaObjectGroup color="#2196F3" />,
    route: "/fusionner-pdf",
    haveToLogin: false,
  },
  {
    title: "Compresser PDF",
    description:
      "Réduisez la taille de vos fichiers PDF tout en gardant la qualité.",
    icon: <FaFileArchive color="#FF9800" />,
    route: "/compresser-pdf",
    haveToLogin: false,
  },
  {
    title: "Convertir PDF",
    description:
      "Transformez vos PDF vers d'autres formats de fichiers courants.",
    icon: <FaExchangeAlt color="#9C27B0" />,
    route: "/convertir-pdf",
    haveToLogin: false,
  },
  {
    title: "Protéger PDF",
    description: "Sécurisez vos PDF avec un mot de passe et des restrictions.",
    icon: <FaLock color="#E91E63" />,
    route: "/proteger-pdf",
    haveToLogin: false,
  },
  {
    title: "Extraire Pages",
    description: "Créez de nouveaux PDF en extrayant des pages sélectionnées.",
    icon: <FaFileExport color="#009688" />,
    route: "/extraire-pages",
    haveToLogin: false,
  },
  {
    title: "Réorganiser PDF",
    description: "Modifiez l'ordre des pages de vos fichiers PDF facilement.",
    icon: <FaSort color="#673AB7" />,
    route: "/reorganiser-pdf",
    haveToLogin: false,
  },
  {
    title: "Annoter PDF",
    description: "Ajoutez des notes et des marquages à vos documents PDF.",
    icon: <FaEdit color="#795548" />,
    route: "/annoter-pdf",
    haveToLogin: false,
  },
];
