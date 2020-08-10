# VarG - Variantenfolgegraph-Editor

Die Webanwendung VarG ist entwickelt für Lehrende und Lernende aus dem Maschinenbau Bachelorstudiengang.
Diese erleichtert die einheitliche Erstellung, Bearbeitung, Optimierung sowie Im- bzw. Exportierung von sogenannten Variantenfolgegraphen. Darunter ist eine graphische Übersicht zu verstehen, die die möglichen Varianten eines Produktionsprozesses für ein Werkstück darstellt. 

## Git Branches

Im VarG-Repository befinden sich 2 grundlegende Branches:
  1. master - Dies ist immer der aktuelle "Stable Build" des Programms, d.h. auf diesen darf nur gemerged werden, wenn die Änderungen gründlich getestet und als Release-Ready eingestuft wurden. Ein guter Indikator für einen stabilen Zustand ist die erfolgreich abschließende GitLab CI/CD Pipeline (die Datei `.gitlab-ci.yml` im Projektordner).
  2. prod - Dies ist eine Kopie des master-Branches mit notwendigen Änderungen, um die Anwendung auf einem Server laufen zu lassen. Bei den Änderungen handelt es sich um Dinge wie IP-Adressen und Zugangsdaten, die in der Developer-Version anders sind als in der Live-Version.

Zum besseren Verständnis der Projektstruktur und des Projekts allgemein empfiehlt es sich, die Dokumentation zu lesen (`documentation/projektdokumentation.pdf`).
