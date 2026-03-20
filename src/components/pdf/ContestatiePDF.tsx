"use client";

import {
  Document,
  Font,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 60,
    lineHeight: 1.6,
    color: "#1a1a1a",
  },
  title: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  senderBlock: {
    marginBottom: 20,
  },
  senderLabel: {
    fontSize: 9,
    color: "#666",
    fontFamily: "Roboto",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  senderText: {
    fontSize: 11,
  },
  recipientBlock: {
    alignSelf: "flex-end",
    textAlign: "right",
    marginBottom: 28,
  },
  recipientLabel: {
    fontSize: 9,
    color: "#666",
    fontFamily: "Roboto",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  recipientText: {
    fontSize: 11,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 24,
  },
  body: {
    fontSize: 11,
    lineHeight: 1.75,
    textAlign: "justify",
    marginBottom: 24,
    whiteSpace: "pre-wrap",
  },
  footer: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 10,
    color: "#444",
  },
  disclaimer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderTopStyle: "solid",
  },
  disclaimerText: {
    fontSize: 8,
    color: "#888",
    textAlign: "center",
  },
});

interface PDFDocumentProps {
  text: string;
  datePersonale: {
    numePrenume: string;
    cnp: string;
    adresa: string;
    judet: string;
    telefon: string;
    email: string;
  };
  emitent: string;
}

function ContestatiePDFDocument({ text, datePersonale, emitent }: PDFDocumentProps) {
  const today = new Date().toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sender */}
        <View style={styles.senderBlock}>
          <Text style={styles.senderLabel}>Petent</Text>
          <Text style={styles.senderText}>
            {datePersonale.numePrenume}
          </Text>
          <Text style={styles.senderText}>
            {datePersonale.adresa}, jud. {datePersonale.judet}
          </Text>
          <Text style={styles.senderText}>
            Tel: {datePersonale.telefon} | Email: {datePersonale.email}
          </Text>
        </View>

        {/* Recipient */}
        <View style={styles.recipientBlock}>
          <Text style={styles.recipientLabel}>Către</Text>
          <Text style={styles.recipientText}>{emitent}</Text>
        </View>

        <View style={styles.divider} />

        {/* Title */}
        <Text style={styles.title}>Contestație</Text>

        {/* Generated text body */}
        <Text style={styles.body}>{text}</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Data: {today}</Text>
          <Text style={styles.footerText}>Semnătură: ___________________</Text>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            Acest document este generat automat si nu constituie consultanta juridica. Consultati un avocat pentru situatii complexe.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

interface PDFDownloadButtonProps {
  text: string | null;
  datePersonale: {
    numePrenume: string;
    cnp: string;
    adresa: string;
    judet: string;
    telefon: string;
    email: string;
  };
  emitent: string;
  contestatieId: string;
}

export function PDFDownloadButton({
  text,
  datePersonale,
  emitent,
  contestatieId,
}: PDFDownloadButtonProps) {
  const fileName = `contestatie-${contestatieId}.pdf`;

  if (!text) return null;

  return (
    <PDFDownloadLink
      document={
        <ContestatiePDFDocument
          text={text}
          datePersonale={datePersonale}
          emitent={emitent}
        />
      }
      fileName={fileName}
    >
      {({ loading, error }) => (
        <Button
          variant={error ? "destructive" : "default"}
          size="sm"
          disabled={loading}
          title={error ? String(error) : undefined}
        >
          {loading
            ? "Se pregătește PDF..."
            : error
              ? "Eroare PDF"
              : "⬇ Descarcă PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
