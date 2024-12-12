import React from "react";
import "./AnonymiserPdf.css";
import { AnonymiserPdfProps, useAnonymiserPdf } from "./useAnonymiserPdf";

const AnonymiserPdf: React.FC = (props: AnonymiserPdfProps) => {
  useAnonymiserPdf(props);
  return (
    <section className="section  newPageSection anonymiser-pdf">
      <div className="container">
        <h2 className="h2 section-title">Anonymiser un PDF</h2>
      </div>
    </section>
  );
};

export default AnonymiserPdf;
