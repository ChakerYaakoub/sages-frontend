import spacy
import re
from PyPDF2 import PdfReader
from spire.pdf import *
from spire.pdf.common import *
import faker
import random


def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            full_text += text + "\n"
    return full_text


pdf_file_path = "factures/facture_000.pdf"
try:
    text = extract_text_from_pdf(pdf_file_path)
    print("Texte extrait du PDF:")
except Exception as e:
    print(f"Une erreur est survenue : {str(e)}")

nlp = spacy.load("fr_core_news_sm")

name_pattern = r"\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b"

doc = nlp(text)

detected_entities = {
    "Noms": [],
    "Emails": [],
    "Téléphones": [],
    "Nombres": [],
    "IBANs": [],
    "BICs": [],
}

for ent in doc.ents:
    if ent.label_ == "PER" and ent.text not in detected_entities["Noms"]:
        detected_entities["Noms"].append(ent.text)

regex_names = re.findall(name_pattern, text)
for name in regex_names:
    if name not in detected_entities["Noms"] and name.lower() not in [
        "date",
        "cordialement",
        "siret",
        "mail",
        "mode",
        "conditions",
        "nous",
        "au",
        "intracom",
        "code",
    ]:
        sep_new_line = name.split("\n")
        for name in sep_new_line:
            if name not in detected_entities["Noms"]:
                detected_entities["Noms"].append(name)

detected_entities["Noms"] = [ent for ent in detected_entities["Noms"] if len(ent) > 2]

email_pattern = r"\b[A-Za-z0-9.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
phone_pattern = r"\b(?:\+?\d{1,3}\s?)?(?:\(?\d{1,4}\)?\s?)?\d{1,4}(?:\s?\d{1,4}){1,3}\b"
iban_pattern = r"[A-Z]{2}\d{2}\s?(?:\d{4}\s?){4,7}\d{1,4}"
bic_pattern = r"[A-Z]{4}\s?\w{2}\s?\w{2}"

texte_coupe_a_bic = text.split("BIC")

detected_entities["Emails"] = re.findall(email_pattern, text)
detected_entities["Téléphones"] = re.findall(phone_pattern, text)
allTel = detected_entities["Téléphones"]
detected_entities["Téléphones"] = [
    phone for phone in allTel if len(phone) >= 10 and len(phone) <= 14
]
detected_entities["Nombres"] = [
    nb for nb in allTel if (len(nb) < 10 or len(nb) > 14) and len(nb) > 4
]
detected_entities["IBANs"] = re.findall(iban_pattern, text)
for elt in texte_coupe_a_bic[1:]:
    detected_entities["BICs"].append(re.findall(bic_pattern, elt)[0])

print("Résultats détectés :")
for category, entities in detected_entities.items():
    print(f"{category} : {entities}")

fake = faker.Faker()


bic = "".join(random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ") for _ in range(8))

pdf = PdfDocument()

pdf.LoadFromFile(pdf_file_path)

for i in range(pdf.Pages.Count):
    page = pdf.Pages.get_Item(i)

    replacer = PdfTextReplacer(page)

    for category, entities in detected_entities.items():
        if category == "Noms":
            for entity in entities:
                nom = fake.name()
                for chr in entity:
                    if not chr.isalpha():
                        nom = nom + chr
                replacer.ReplaceAllText(entity, nom)
        elif category == "Téléphones":
            for entity in entities:
                # tel = fake.phone_number()
                tel = ''
                for elt in entity:
                    if not elt.isdigit():
                        tel += elt
                    else:
                        tel += str(random.randint(0, 9))
                replacer.ReplaceAllText(entity, tel)
        elif category == "Nombres":
            for entity in entities:
                replacer.ReplaceAllText(
                    entity,
                    str(random.randint(10 ** (len(entity) - 1), 10 ** len(entity) - 1)),
                )
        elif category == "Emails":
            for entity in entities:
                mail = fake.email()
                replacer.ReplaceAllText(entity, mail)
        elif category == "IBANs":
            for entity in entities:
                iban = fake.iban()[2:]
                replacer.ReplaceAllText(entity[2:], iban)
        elif category == "BICs":
            for entity in entities:
                replacer.ReplaceAllText(entity, bic)

output_pdf_path = "output/output_anonymise.pdf"
pdf.SaveToFile(output_pdf_path)
pdf.Close()

print(f"Le PDF modifié a été sauvegardé sous : {output_pdf_path}")
