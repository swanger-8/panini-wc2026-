import { useState, useCallback, useMemo, useRef, useEffect } from "react";

const STICKERS = [
  // FWC Opening foils
  { id: "00", label: "Panini Logo", team: "FWC", foil: true },
  { id: "FWC1", label: "Official Emblem", team: "FWC", foil: true },
  { id: "FWC2", label: "Official Emblem", team: "FWC", foil: true },
  { id: "FWC3", label: "Official Mascots", team: "FWC", foil: true },
  { id: "FWC4", label: "Official Slogan", team: "FWC", foil: true },
  { id: "FWC5", label: "Official Ball", team: "FWC", foil: true },
  { id: "FWC6", label: "Canada - Host Countries & Cities", team: "FWC", foil: true },
  { id: "FWC7", label: "Mexico - Host Countries & Cities", team: "FWC", foil: true },
  { id: "FWC8", label: "USA - Host Countries & Cities", team: "FWC", foil: true },
  { id: "FWC9", label: "Italy 1934 - World Cup History", team: "FWC", foil: true },
  { id: "FWC10", label: "Uruguay 1950 - World Cup History", team: "FWC", foil: true },
  { id: "FWC11", label: "West Germany 1954 - World Cup History", team: "FWC", foil: true },
  { id: "FWC12", label: "Brazil 1962 - World Cup History", team: "FWC", foil: true },
  { id: "FWC13", label: "West Germany 1974 - World Cup History", team: "FWC", foil: true },
  { id: "FWC14", label: "Argentina 1986 - World Cup History", team: "FWC", foil: true },
  { id: "FWC15", label: "Brazil 1994 - World Cup History", team: "FWC", foil: true },
  { id: "FWC16", label: "Brazil 2002 - World Cup History", team: "FWC", foil: true },
  { id: "FWC17", label: "Italy 2006 - World Cup History", team: "FWC", foil: true },
  { id: "FWC18", label: "Germany 2014 - World Cup History", team: "FWC", foil: true },
  { id: "FWC19", label: "Argentina 2022 - World Cup History", team: "FWC", foil: true },

  // Mexico
  { id: "MEX1", label: "Team Logo", team: "Mexico", foil: true },
  { id: "MEX2", label: "Luis Malagón", team: "Mexico" },
  { id: "MEX3", label: "Johan Vasquez", team: "Mexico" },
  { id: "MEX4", label: "Jorge Sánchez", team: "Mexico" },
  { id: "MEX5", label: "Cesar Montes", team: "Mexico" },
  { id: "MEX6", label: "Jesus Gallardo", team: "Mexico" },
  { id: "MEX7", label: "Israel Reyes", team: "Mexico" },
  { id: "MEX8", label: "Diego Lainez", team: "Mexico" },
  { id: "MEX9", label: "Carlos Rodriguez", team: "Mexico" },
  { id: "MEX10", label: "Edson Alvarez", team: "Mexico" },
  { id: "MEX11", label: "Orbelin Pineda", team: "Mexico" },
  { id: "MEX12", label: "Marcel Ruiz", team: "Mexico" },
  { id: "MEX13", label: "Team Photo", team: "Mexico" },
  { id: "MEX14", label: "Érick Sánchez", team: "Mexico" },
  { id: "MEX15", label: "Hirving Lozano", team: "Mexico" },
  { id: "MEX16", label: "Santiago Giménez", team: "Mexico" },
  { id: "MEX17", label: "Raúl Jiménez", team: "Mexico" },
  { id: "MEX18", label: "Alexis Vega", team: "Mexico" },
  { id: "MEX19", label: "Roberto Alvarado", team: "Mexico" },
  { id: "MEX20", label: "Cesar Huerta", team: "Mexico" },

  // South Africa
  { id: "RSA1", label: "Team Logo", team: "South Africa", foil: true },
  { id: "RSA2", label: "Ronwen Williams", team: "South Africa" },
  { id: "RSA3", label: "Sipho Chaine", team: "South Africa" },
  { id: "RSA4", label: "Aubrey Modiba", team: "South Africa" },
  { id: "RSA5", label: "Samukele Kabini", team: "South Africa" },
  { id: "RSA6", label: "Mbekezeli Mbokazi", team: "South Africa" },
  { id: "RSA7", label: "Khulumani Ndamane", team: "South Africa" },
  { id: "RSA8", label: "Siyabonga Ngezana", team: "South Africa" },
  { id: "RSA9", label: "Khuliso Mudau", team: "South Africa" },
  { id: "RSA10", label: "Nkosinathi Sibisi", team: "South Africa" },
  { id: "RSA11", label: "Teboho Mokoena", team: "South Africa" },
  { id: "RSA12", label: "Thalente Mbatha", team: "South Africa" },
  { id: "RSA13", label: "Team Photo", team: "South Africa" },
  { id: "RSA14", label: "Bathasi Aubaas", team: "South Africa" },
  { id: "RSA15", label: "Yaya Sithole", team: "South Africa" },
  { id: "RSA16", label: "Sipho Mbule", team: "South Africa" },
  { id: "RSA17", label: "Lyle Foster", team: "South Africa" },
  { id: "RSA18", label: "Iqraam Rayners", team: "South Africa" },
  { id: "RSA19", label: "Mohau Nkota", team: "South Africa" },
  { id: "RSA20", label: "Oswin Appollis", team: "South Africa" },

  // South Korea
  { id: "KOR1", label: "Team Logo", team: "South Korea", foil: true },
  { id: "KOR2", label: "Hyeon-woo Jo", team: "South Korea" },
  { id: "KOR3", label: "Seung-Gyu Kim", team: "South Korea" },
  { id: "KOR4", label: "Min-jae Kim", team: "South Korea" },
  { id: "KOR5", label: "Yu-min Cho", team: "South Korea" },
  { id: "KOR6", label: "Young-woo Seol", team: "South Korea" },
  { id: "KOR7", label: "Han-beom Lee", team: "South Korea" },
  { id: "KOR8", label: "Tae-seok Lee", team: "South Korea" },
  { id: "KOR9", label: "Myung-jae Lee", team: "South Korea" },
  { id: "KOR10", label: "Jae-sung Lee", team: "South Korea" },
  { id: "KOR11", label: "In-beom Hwang", team: "South Korea" },
  { id: "KOR12", label: "Kang-in Lee", team: "South Korea" },
  { id: "KOR13", label: "Team Photo", team: "South Korea" },
  { id: "KOR14", label: "Seung-ho Paik", team: "South Korea" },
  { id: "KOR15", label: "Jens Castrop", team: "South Korea" },
  { id: "KOR16", label: "Dongg-yeong Lee", team: "South Korea" },
  { id: "KOR17", label: "Gue-sung Cho", team: "South Korea" },
  { id: "KOR18", label: "Heung-min Son", team: "South Korea" },
  { id: "KOR19", label: "Hee-chan Hwang", team: "South Korea" },
  { id: "KOR20", label: "Hyeon-Gyu Oh", team: "South Korea" },

  // Czechia
  { id: "CZE1", label: "Team Logo", team: "Czechia", foil: true },
  { id: "CZE2", label: "Matej Kovar", team: "Czechia" },
  { id: "CZE3", label: "Jindrich Stanek", team: "Czechia" },
  { id: "CZE4", label: "Ladislav Krejci", team: "Czechia" },
  { id: "CZE5", label: "Vladimir Coufal", team: "Czechia" },
  { id: "CZE6", label: "Jaroslav Zeleny", team: "Czechia" },
  { id: "CZE7", label: "Tomas Holes", team: "Czechia" },
  { id: "CZE8", label: "David Zima", team: "Czechia" },
  { id: "CZE9", label: "Michal Sadilek", team: "Czechia" },
  { id: "CZE10", label: "Lukas Provod", team: "Czechia" },
  { id: "CZE11", label: "Lukas Cerv", team: "Czechia" },
  { id: "CZE12", label: "Tomas Soucek", team: "Czechia" },
  { id: "CZE13", label: "Team Photo", team: "Czechia" },
  { id: "CZE14", label: "Pavel Sulc", team: "Czechia" },
  { id: "CZE15", label: "Matej Vydra", team: "Czechia" },
  { id: "CZE16", label: "Vasil Kusej", team: "Czechia" },
  { id: "CZE17", label: "Tomas Chory", team: "Czechia" },
  { id: "CZE18", label: "Vaclav Cerny", team: "Czechia" },
  { id: "CZE19", label: "Adam Hlozek", team: "Czechia" },
  { id: "CZE20", label: "Patrik Schick", team: "Czechia" },

  // Canada
  { id: "CAN1", label: "Team Logo", team: "Canada", foil: true },
  { id: "CAN2", label: "Dayne St.Clair", team: "Canada" },
  { id: "CAN3", label: "Alphonso Davies", team: "Canada" },
  { id: "CAN4", label: "Alistair Johnston", team: "Canada" },
  { id: "CAN5", label: "Samuel Adekugbe", team: "Canada" },
  { id: "CAN6", label: "Riche Larvea", team: "Canada" },
  { id: "CAN7", label: "Derek Cornelius", team: "Canada" },
  { id: "CAN8", label: "Moïse Bombito", team: "Canada" },
  { id: "CAN9", label: "Kamal Miller", team: "Canada" },
  { id: "CAN10", label: "Stephen Eustáquio", team: "Canada" },
  { id: "CAN11", label: "Ismaël Koné", team: "Canada" },
  { id: "CAN12", label: "Jonathan Osorio", team: "Canada" },
  { id: "CAN13", label: "Team Photo", team: "Canada" },
  { id: "CAN14", label: "Jacob Shaffelburg", team: "Canada" },
  { id: "CAN15", label: "Mathieu Choinière", team: "Canada" },
  { id: "CAN16", label: "Niko Sigur", team: "Canada" },
  { id: "CAN17", label: "Tajon Buchanan", team: "Canada" },
  { id: "CAN18", label: "Liam Millar", team: "Canada" },
  { id: "CAN19", label: "Cyle Larin", team: "Canada" },
  { id: "CAN20", label: "Jonathan David", team: "Canada" },

  // Bosnia and Herzegovina
  { id: "BIH1", label: "Team Logo", team: "Bosnia & Herzegovina", foil: true },
  { id: "BIH2", label: "Nikola Vasilj", team: "Bosnia & Herzegovina" },
  { id: "BIH3", label: "Amer Dedic", team: "Bosnia & Herzegovina" },
  { id: "BIH4", label: "Sead Kolasinac", team: "Bosnia & Herzegovina" },
  { id: "BIH5", label: "Tarik Muharemovic", team: "Bosnia & Herzegovina" },
  { id: "BIH6", label: "Nihad Mujakic", team: "Bosnia & Herzegovina" },
  { id: "BIH7", label: "Nikola Katic", team: "Bosnia & Herzegovina" },
  { id: "BIH8", label: "Amir Hadziahmetovic", team: "Bosnia & Herzegovina" },
  { id: "BIH9", label: "Benjamin Tahirovic", team: "Bosnia & Herzegovina" },
  { id: "BIH10", label: "Armin Gigovic", team: "Bosnia & Herzegovina" },
  { id: "BIH11", label: "Ivan Sunjic", team: "Bosnia & Herzegovina" },
  { id: "BIH12", label: "Ivan Basic", team: "Bosnia & Herzegovina" },
  { id: "BIH13", label: "Team Photo", team: "Bosnia & Herzegovina" },
  { id: "BIH14", label: "Dzenis Burnic", team: "Bosnia & Herzegovina" },
  { id: "BIH15", label: "Esmir Bajraktarevic", team: "Bosnia & Herzegovina" },
  { id: "BIH16", label: "Amar Memic", team: "Bosnia & Herzegovina" },
  { id: "BIH17", label: "Ermedin Demirovic", team: "Bosnia & Herzegovina" },
  { id: "BIH18", label: "Edin Dzeko", team: "Bosnia & Herzegovina" },
  { id: "BIH19", label: "Samed Bazdar", team: "Bosnia & Herzegovina" },
  { id: "BIH20", label: "Haris Tabakovic", team: "Bosnia & Herzegovina" },

  // Qatar
  { id: "QAT1", label: "Team Logo", team: "Qatar", foil: true },
  { id: "QAT2", label: "Meshaal Barsham", team: "Qatar" },
  { id: "QAT3", label: "Sultan Albrake", team: "Qatar" },
  { id: "QAT4", label: "Lucas Mendes", team: "Qatar" },
  { id: "QAT5", label: "Homam Ahmed", team: "Qatar" },
  { id: "QAT6", label: "Boualem Khoukhi", team: "Qatar" },
  { id: "QAT7", label: "Pedro Miguel", team: "Qatar" },
  { id: "QAT8", label: "Tarek Salman", team: "Qatar" },
  { id: "QAT9", label: "Mohamed Al-Mannai", team: "Qatar" },
  { id: "QAT10", label: "Karim Boudiaf", team: "Qatar" },
  { id: "QAT11", label: "Assim Madibo", team: "Qatar" },
  { id: "QAT12", label: "Ahmed Fatehi", team: "Qatar" },
  { id: "QAT13", label: "Team Photo", team: "Qatar" },
  { id: "QAT14", label: "Mohammed Waad", team: "Qatar" },
  { id: "QAT15", label: "Abdulaziz Hatem", team: "Qatar" },
  { id: "QAT16", label: "Hassan Al-Haydos", team: "Qatar" },
  { id: "QAT17", label: "Edmilson Junior", team: "Qatar" },
  { id: "QAT18", label: "Akram Hassan Afif", team: "Qatar" },
  { id: "QAT19", label: "Ahmed Al Ganehi", team: "Qatar" },
  { id: "QAT20", label: "Almoez Ali", team: "Qatar" },

  // Switzerland
  { id: "SUI1", label: "Team Logo", team: "Switzerland", foil: true },
  { id: "SUI2", label: "Gregor Kobel", team: "Switzerland" },
  { id: "SUI3", label: "Yvon Mvogo", team: "Switzerland" },
  { id: "SUI4", label: "Manuel Akanji", team: "Switzerland" },
  { id: "SUI5", label: "Ricardo Rodriguez", team: "Switzerland" },
  { id: "SUI6", label: "Nico Elvedi", team: "Switzerland" },
  { id: "SUI7", label: "Aurèle Amenda", team: "Switzerland" },
  { id: "SUI8", label: "Silvan Widmer", team: "Switzerland" },
  { id: "SUI9", label: "Granit Xhaka", team: "Switzerland" },
  { id: "SUI10", label: "Denis Zakaria", team: "Switzerland" },
  { id: "SUI11", label: "Remo Freuler", team: "Switzerland" },
  { id: "SUI12", label: "Fabian Rieder", team: "Switzerland" },
  { id: "SUI13", label: "Team Photo", team: "Switzerland" },
  { id: "SUI14", label: "Ardon Jashari", team: "Switzerland" },
  { id: "SUI15", label: "Johan Manzambi", team: "Switzerland" },
  { id: "SUI16", label: "Michel Aebischer", team: "Switzerland" },
  { id: "SUI17", label: "Breel Embolo", team: "Switzerland" },
  { id: "SUI18", label: "Ruben Vargas", team: "Switzerland" },
  { id: "SUI19", label: "Dan Ndoye", team: "Switzerland" },
  { id: "SUI20", label: "Zeki Amdouni", team: "Switzerland" },

  // Brazil
  { id: "BRA1", label: "Team Logo", team: "Brazil", foil: true },
  { id: "BRA2", label: "Alisson", team: "Brazil" },
  { id: "BRA3", label: "Bento", team: "Brazil" },
  { id: "BRA4", label: "Marquinhos", team: "Brazil" },
  { id: "BRA5", label: "Éder Militão", team: "Brazil" },
  { id: "BRA6", label: "Gabriel Magalhães", team: "Brazil" },
  { id: "BRA7", label: "Danilo", team: "Brazil" },
  { id: "BRA8", label: "Wesley", team: "Brazil" },
  { id: "BRA9", label: "Lucas Paquetá", team: "Brazil" },
  { id: "BRA10", label: "Casemiro", team: "Brazil" },
  { id: "BRA11", label: "Bruno Guimarães", team: "Brazil" },
  { id: "BRA12", label: "Luiz Henrique", team: "Brazil" },
  { id: "BRA13", label: "Team Photo", team: "Brazil" },
  { id: "BRA14", label: "Vinicius Júnior", team: "Brazil" },
  { id: "BRA15", label: "Rodrygo", team: "Brazil" },
  { id: "BRA16", label: "João Pedro", team: "Brazil" },
  { id: "BRA17", label: "Matheus Cunha", team: "Brazil" },
  { id: "BRA18", label: "Gabriel Martinelli", team: "Brazil" },
  { id: "BRA19", label: "Raphinha", team: "Brazil" },
  { id: "BRA20", label: "Estévão", team: "Brazil" },

  // Morocco
  { id: "MAR1", label: "Team Logo", team: "Morocco", foil: true },
  { id: "MAR2", label: "Yassine Bounou", team: "Morocco" },
  { id: "MAR3", label: "Munir El Kajoui", team: "Morocco" },
  { id: "MAR4", label: "Achraf Hakimi", team: "Morocco" },
  { id: "MAR5", label: "Noussair Mazraoui", team: "Morocco" },
  { id: "MAR6", label: "Nayef Aguerd", team: "Morocco" },
  { id: "MAR7", label: "Roman Saiss", team: "Morocco" },
  { id: "MAR8", label: "Jawad El Yamio", team: "Morocco" },
  { id: "MAR9", label: "Adam Masina", team: "Morocco" },
  { id: "MAR10", label: "Sofyan Amrabat", team: "Morocco" },
  { id: "MAR11", label: "Azzedine Ounahi", team: "Morocco" },
  { id: "MAR12", label: "Eliesse Ben Seghir", team: "Morocco" },
  { id: "MAR13", label: "Team Photo", team: "Morocco" },
  { id: "MAR14", label: "Bilal El Khannouss", team: "Morocco" },
  { id: "MAR15", label: "Ismael Saibari", team: "Morocco" },
  { id: "MAR16", label: "Youssef En-Nesyri", team: "Morocco" },
  { id: "MAR17", label: "Abde Ezzalzouli", team: "Morocco" },
  { id: "MAR18", label: "Soufiane Rahimi", team: "Morocco" },
  { id: "MAR19", label: "Brahim Diaz", team: "Morocco" },
  { id: "MAR20", label: "Ayoub El Kaabi", team: "Morocco" },

  // Haiti
  { id: "HAI1", label: "Team Logo", team: "Haiti", foil: true },
  { id: "HAI2", label: "Johny Placide", team: "Haiti" },
  { id: "HAI3", label: "Carlens Arcus", team: "Haiti" },
  { id: "HAI4", label: "Martin Expérience", team: "Haiti" },
  { id: "HAI5", label: "Jean-Kevin Duverne", team: "Haiti" },
  { id: "HAI6", label: "Ricardo Adé", team: "Haiti" },
  { id: "HAI7", label: "Duke Lacroix", team: "Haiti" },
  { id: "HAI8", label: "Garven Metusala", team: "Haiti" },
  { id: "HAI9", label: "Hannes Delcroix", team: "Haiti" },
  { id: "HAI10", label: "Leverton Pierre", team: "Haiti" },
  { id: "HAI11", label: "Danley Jean Jacques", team: "Haiti" },
  { id: "HAI12", label: "Jean-Ricner Bellegarde", team: "Haiti" },
  { id: "HAI13", label: "Team Photo", team: "Haiti" },
  { id: "HAI14", label: "Christopher Attys", team: "Haiti" },
  { id: "HAI15", label: "Derrick Etienne Jr", team: "Haiti" },
  { id: "HAI16", label: "Josue Casimir", team: "Haiti" },
  { id: "HAI17", label: "Ruben Providence", team: "Haiti" },
  { id: "HAI18", label: "Duckens Nazon", team: "Haiti" },
  { id: "HAI19", label: "Louicius Deedson", team: "Haiti" },
  { id: "HAI20", label: "Frantzdy Pierrot", team: "Haiti" },

  // Scotland
  { id: "SCO1", label: "Team Logo", team: "Scotland", foil: true },
  { id: "SCO2", label: "Angus Gunn", team: "Scotland" },
  { id: "SCO3", label: "Jack Hendry", team: "Scotland" },
  { id: "SCO4", label: "Kieran Tierney", team: "Scotland" },
  { id: "SCO5", label: "Aaron Hickey", team: "Scotland" },
  { id: "SCO6", label: "Andrew Robertson", team: "Scotland" },
  { id: "SCO7", label: "Scott McKenna", team: "Scotland" },
  { id: "SCO8", label: "John Souttar", team: "Scotland" },
  { id: "SCO9", label: "Anthony Ralston", team: "Scotland" },
  { id: "SCO10", label: "Grant Hanley", team: "Scotland" },
  { id: "SCO11", label: "Scott McTominay", team: "Scotland" },
  { id: "SCO12", label: "Billy Gilmour", team: "Scotland" },
  { id: "SCO13", label: "Team Photo", team: "Scotland" },
  { id: "SCO14", label: "Lewis Ferguson", team: "Scotland" },
  { id: "SCO15", label: "Ryan Christie", team: "Scotland" },
  { id: "SCO16", label: "Kenny McLean", team: "Scotland" },
  { id: "SCO17", label: "John McGinn", team: "Scotland" },
  { id: "SCO18", label: "Lyndon Dykes", team: "Scotland" },
  { id: "SCO19", label: "Che Adams", team: "Scotland" },
  { id: "SCO20", label: "Ben Gannon-Doak", team: "Scotland" },

  // USA
  { id: "USA1", label: "Team Logo", team: "USA", foil: true },
  { id: "USA2", label: "Matt Freese", team: "USA" },
  { id: "USA3", label: "Chris Richards", team: "USA" },
  { id: "USA4", label: "Tim Ream", team: "USA" },
  { id: "USA5", label: "Mark McKenzie", team: "USA" },
  { id: "USA6", label: "Alex Freeman", team: "USA" },
  { id: "USA7", label: "Antonee Robinson", team: "USA" },
  { id: "USA8", label: "Tyler Adams", team: "USA" },
  { id: "USA9", label: "Tanner Tessmann", team: "USA" },
  { id: "USA10", label: "Weston McKennie", team: "USA" },
  { id: "USA11", label: "Christian Roldan", team: "USA" },
  { id: "USA12", label: "Timothy Weah", team: "USA" },
  { id: "USA13", label: "Team Photo", team: "USA" },
  { id: "USA14", label: "Diego Luna", team: "USA" },
  { id: "USA15", label: "Malik Tillman", team: "USA" },
  { id: "USA16", label: "Christian Pulisic", team: "USA" },
  { id: "USA17", label: "Brenden Aaronson", team: "USA" },
  { id: "USA18", label: "Ricardo Pepi", team: "USA" },
  { id: "USA19", label: "Haji Wright", team: "USA" },
  { id: "USA20", label: "Folarin Balogun", team: "USA" },

  // Paraguay
  { id: "PAR1", label: "Team Logo", team: "Paraguay", foil: true },
  { id: "PAR2", label: "Roberto Fernandez", team: "Paraguay" },
  { id: "PAR3", label: "Orlando Gill", team: "Paraguay" },
  { id: "PAR4", label: "Gustavo Gomez", team: "Paraguay" },
  { id: "PAR5", label: "Fabián Balbuena", team: "Paraguay" },
  { id: "PAR6", label: "Juan José Cáceres", team: "Paraguay" },
  { id: "PAR7", label: "Omar Alderete", team: "Paraguay" },
  { id: "PAR8", label: "Junior Alonso", team: "Paraguay" },
  { id: "PAR9", label: "Mathías Villasanti", team: "Paraguay" },
  { id: "PAR10", label: "Diego Gomez", team: "Paraguay" },
  { id: "PAR11", label: "Damián Bobadilla", team: "Paraguay" },
  { id: "PAR12", label: "Andres Cubas", team: "Paraguay" },
  { id: "PAR13", label: "Team Photo", team: "Paraguay" },
  { id: "PAR14", label: "Matias Galarza Fonda", team: "Paraguay" },
  { id: "PAR15", label: "Julio Enciso", team: "Paraguay" },
  { id: "PAR16", label: "Alejandro Romero Gamarra", team: "Paraguay" },
  { id: "PAR17", label: "Miguel Almirón", team: "Paraguay" },
  { id: "PAR18", label: "Ramon Sosa", team: "Paraguay" },
  { id: "PAR19", label: "Angel Romero", team: "Paraguay" },
  { id: "PAR20", label: "Antonio Sanabria", team: "Paraguay" },

  // Australia
  { id: "AUS1", label: "Team Logo", team: "Australia", foil: true },
  { id: "AUS2", label: "Mathew Ryan", team: "Australia" },
  { id: "AUS3", label: "Joe Gauci", team: "Australia" },
  { id: "AUS4", label: "Harry Souttar", team: "Australia" },
  { id: "AUS5", label: "Alessandro Circati", team: "Australia" },
  { id: "AUS6", label: "Jordan Bos", team: "Australia" },
  { id: "AUS7", label: "Aziz Behich", team: "Australia" },
  { id: "AUS8", label: "Cameron Burgess", team: "Australia" },
  { id: "AUS9", label: "Lewis Miller", team: "Australia" },
  { id: "AUS10", label: "Milos Degenek", team: "Australia" },
  { id: "AUS11", label: "Jackson Irvine", team: "Australia" },
  { id: "AUS12", label: "Riley McGree", team: "Australia" },
  { id: "AUS13", label: "Team Photo", team: "Australia" },
  { id: "AUS14", label: "Aiden O'Neill", team: "Australia" },
  { id: "AUS15", label: "Connor Metcalfe", team: "Australia" },
  { id: "AUS16", label: "Patrick Yazbek", team: "Australia" },
  { id: "AUS17", label: "Craig Goodwin", team: "Australia" },
  { id: "AUS18", label: "Kusini Vengi", team: "Australia" },
  { id: "AUS19", label: "Nestory Irankunda", team: "Australia" },
  { id: "AUS20", label: "Mohamed Touré", team: "Australia" },

  // Türkiye
  { id: "TUR1", label: "Team Logo", team: "Türkiye", foil: true },
  { id: "TUR2", label: "Ugurcan Cakir", team: "Türkiye" },
  { id: "TUR3", label: "Mert Muldur", team: "Türkiye" },
  { id: "TUR4", label: "Zeki Celik", team: "Türkiye" },
  { id: "TUR5", label: "Abdulkerim Bardakci", team: "Türkiye" },
  { id: "TUR6", label: "Caglar Soyuncu", team: "Türkiye" },
  { id: "TUR7", label: "Merih Demiral", team: "Türkiye" },
  { id: "TUR8", label: "Ferdi Kadioglu", team: "Türkiye" },
  { id: "TUR9", label: "Kaan Ayhan", team: "Türkiye" },
  { id: "TUR10", label: "Ismail Yuksek", team: "Türkiye" },
  { id: "TUR11", label: "Hakan Calhanoglu", team: "Türkiye" },
  { id: "TUR12", label: "Orkun Kokcu", team: "Türkiye" },
  { id: "TUR13", label: "Team Photo", team: "Türkiye" },
  { id: "TUR14", label: "Arda Guler", team: "Türkiye" },
  { id: "TUR15", label: "Irfan Can Kahveci", team: "Türkiye" },
  { id: "TUR16", label: "Yunus Akgun", team: "Türkiye" },
  { id: "TUR17", label: "Can Uzun", team: "Türkiye" },
  { id: "TUR18", label: "Baris Alper Yilmaz", team: "Türkiye" },
  { id: "TUR19", label: "Kerem Akturkoglu", team: "Türkiye" },
  { id: "TUR20", label: "Kenan Yildiz", team: "Türkiye" },

  // Germany
  { id: "GER1", label: "Team Logo", team: "Germany", foil: true },
  { id: "GER2", label: "Marc-André ter Stegen", team: "Germany" },
  { id: "GER3", label: "Jonathan Tah", team: "Germany" },
  { id: "GER4", label: "David Raum", team: "Germany" },
  { id: "GER5", label: "Nico Schlotterbeck", team: "Germany" },
  { id: "GER6", label: "Antonio Rüdiger", team: "Germany" },
  { id: "GER7", label: "Waldemar Anton", team: "Germany" },
  { id: "GER8", label: "Ridle Baku", team: "Germany" },
  { id: "GER9", label: "Maximilian Mittelstadt", team: "Germany" },
  { id: "GER10", label: "Joshua Kimmich", team: "Germany" },
  { id: "GER11", label: "Florian Wirtz", team: "Germany" },
  { id: "GER12", label: "Felix Nmecha", team: "Germany" },
  { id: "GER13", label: "Team Photo", team: "Germany" },
  { id: "GER14", label: "Leon Goretzka", team: "Germany" },
  { id: "GER15", label: "Jamal Musiala", team: "Germany" },
  { id: "GER16", label: "Serge Gnabry", team: "Germany" },
  { id: "GER17", label: "Kai Havertz", team: "Germany" },
  { id: "GER18", label: "Leroy Sane", team: "Germany" },
  { id: "GER19", label: "Karim Adeyemi", team: "Germany" },
  { id: "GER20", label: "Nick Woltemade", team: "Germany" },

  // Curaçao
  { id: "CUW1", label: "Team Logo", team: "Curaçao", foil: true },
  { id: "CUW2", label: "Eloy Room", team: "Curaçao" },
  { id: "CUW3", label: "Armando Obispo", team: "Curaçao" },
  { id: "CUW4", label: "Sherel Floranus", team: "Curaçao" },
  { id: "CUW5", label: "Jurien Gaari", team: "Curaçao" },
  { id: "CUW6", label: "Joshua Brenet", team: "Curaçao" },
  { id: "CUW7", label: "Roshon Van Eijma", team: "Curaçao" },
  { id: "CUW8", label: "Shurandy Sambo", team: "Curaçao" },
  { id: "CUW9", label: "Livano Comenencia", team: "Curaçao" },
  { id: "CUW10", label: "Godfried Roemeratoe", team: "Curaçao" },
  { id: "CUW11", label: "Juninho Bacuna", team: "Curaçao" },
  { id: "CUW12", label: "Leandro Bacuna", team: "Curaçao" },
  { id: "CUW13", label: "Team Photo", team: "Curaçao" },
  { id: "CUW14", label: "Tahith Chong", team: "Curaçao" },
  { id: "CUW15", label: "Kenji Gorre", team: "Curaçao" },
  { id: "CUW16", label: "Jearl Margaritha", team: "Curaçao" },
  { id: "CUW17", label: "Jurgen Locadia", team: "Curaçao" },
  { id: "CUW18", label: "Jeremy Antonisse", team: "Curaçao" },
  { id: "CUW19", label: "Gervane Kastaneer", team: "Curaçao" },
  { id: "CUW20", label: "Sontje Hansen", team: "Curaçao" },

  // Ivory Coast
  { id: "CIV1", label: "Team Logo", team: "Ivory Coast", foil: true },
  { id: "CIV2", label: "Yahia Fofana", team: "Ivory Coast" },
  { id: "CIV3", label: "Ghislain Konan", team: "Ivory Coast" },
  { id: "CIV4", label: "Wilfried Singo", team: "Ivory Coast" },
  { id: "CIV5", label: "Odilon Kossounou", team: "Ivory Coast" },
  { id: "CIV6", label: "Evan Ndicka", team: "Ivory Coast" },
  { id: "CIV7", label: "Willy Boly", team: "Ivory Coast" },
  { id: "CIV8", label: "Emmanuel Agbadou", team: "Ivory Coast" },
  { id: "CIV9", label: "Ousmane Diomande", team: "Ivory Coast" },
  { id: "CIV10", label: "Franck Kessie", team: "Ivory Coast" },
  { id: "CIV11", label: "Seko Fofana", team: "Ivory Coast" },
  { id: "CIV12", label: "Ibrahim Sangare", team: "Ivory Coast" },
  { id: "CIV13", label: "Team Photo", team: "Ivory Coast" },
  { id: "CIV14", label: "Jean-Philippe Gbamin", team: "Ivory Coast" },
  { id: "CIV15", label: "Amad Diallo", team: "Ivory Coast" },
  { id: "CIV16", label: "Sébastien Haller", team: "Ivory Coast" },
  { id: "CIV17", label: "Simon Adingra", team: "Ivory Coast" },
  { id: "CIV18", label: "Yan Diomande", team: "Ivory Coast" },
  { id: "CIV19", label: "Evann Guessand", team: "Ivory Coast" },
  { id: "CIV20", label: "Oumar Diakite", team: "Ivory Coast" },

  // Ecuador
  { id: "ECU1", label: "Team Logo", team: "Ecuador", foil: true },
  { id: "ECU2", label: "Hernán Galíndez", team: "Ecuador" },
  { id: "ECU3", label: "Gonzalo Valle", team: "Ecuador" },
  { id: "ECU4", label: "Piero Hincapié", team: "Ecuador" },
  { id: "ECU5", label: "Pervis Estupiñán", team: "Ecuador" },
  { id: "ECU6", label: "Willian Pacho", team: "Ecuador" },
  { id: "ECU7", label: "Ángelo Preciado", team: "Ecuador" },
  { id: "ECU8", label: "Joel Ordóñez", team: "Ecuador" },
  { id: "ECU9", label: "Moises Caicedo", team: "Ecuador" },
  { id: "ECU10", label: "Alan Franco", team: "Ecuador" },
  { id: "ECU11", label: "Kendry Paez", team: "Ecuador" },
  { id: "ECU12", label: "Pedro Vite", team: "Ecuador" },
  { id: "ECU13", label: "Team Photo", team: "Ecuador" },
  { id: "ECU14", label: "John Veboah", team: "Ecuador" },
  { id: "ECU15", label: "Leonardo Campana", team: "Ecuador" },
  { id: "ECU16", label: "Gonzalo Plata", team: "Ecuador" },
  { id: "ECU17", label: "Nilson Angulo", team: "Ecuador" },
  { id: "ECU18", label: "Alan Minda", team: "Ecuador" },
  { id: "ECU19", label: "Kevin Rodriguez", team: "Ecuador" },
  { id: "ECU20", label: "Enner Valencia", team: "Ecuador" },

  // Netherlands
  { id: "NED1", label: "Team Logo", team: "Netherlands", foil: true },
  { id: "NED2", label: "Bart Verbruggen", team: "Netherlands" },
  { id: "NED3", label: "Virgil van Dijk", team: "Netherlands" },
  { id: "NED4", label: "Micky van de Ven", team: "Netherlands" },
  { id: "NED5", label: "Jurrien Timber", team: "Netherlands" },
  { id: "NED6", label: "Denzel Dumfries", team: "Netherlands" },
  { id: "NED7", label: "Nathan Aké", team: "Netherlands" },
  { id: "NED8", label: "Jeremie Frimpong", team: "Netherlands" },
  { id: "NED9", label: "Jan Paul van Hecke", team: "Netherlands" },
  { id: "NED10", label: "Tijjani Reijnders", team: "Netherlands" },
  { id: "NED11", label: "Ryan Gravenberch", team: "Netherlands" },
  { id: "NED12", label: "Teun Koopmeiners", team: "Netherlands" },
  { id: "NED13", label: "Team Photo", team: "Netherlands" },
  { id: "NED14", label: "Frenkie de Jong", team: "Netherlands" },
  { id: "NED15", label: "Xavi Simons", team: "Netherlands" },
  { id: "NED16", label: "Justin Kluivert", team: "Netherlands" },
  { id: "NED17", label: "Memphis Depay", team: "Netherlands" },
  { id: "NED18", label: "Donyell Malen", team: "Netherlands" },
  { id: "NED19", label: "Wout Weghorst", team: "Netherlands" },
  { id: "NED20", label: "Cody Gakpo", team: "Netherlands" },

  // Japan
  { id: "JPN1", label: "Team Logo", team: "Japan", foil: true },
  { id: "JPN2", label: "Zion Suzuki", team: "Japan" },
  { id: "JPN3", label: "Henry Heroki Mochizuki", team: "Japan" },
  { id: "JPN4", label: "Ayumu Seko", team: "Japan" },
  { id: "JPN5", label: "Junnosuke Suzuki", team: "Japan" },
  { id: "JPN6", label: "Shogo Taniguchi", team: "Japan" },
  { id: "JPN7", label: "Tsuyoshi Watanabe", team: "Japan" },
  { id: "JPN8", label: "Kaishu Sano", team: "Japan" },
  { id: "JPN9", label: "Yuki Soma", team: "Japan" },
  { id: "JPN10", label: "Ao Tanaka", team: "Japan" },
  { id: "JPN11", label: "Daichi Kamada", team: "Japan" },
  { id: "JPN12", label: "Takefusa Kubo", team: "Japan" },
  { id: "JPN13", label: "Team Photo", team: "Japan" },
  { id: "JPN14", label: "Ritsu Doan", team: "Japan" },
  { id: "JPN15", label: "Keito Nakamura", team: "Japan" },
  { id: "JPN16", label: "Takumi Minamino", team: "Japan" },
  { id: "JPN17", label: "Shuto Machino", team: "Japan" },
  { id: "JPN18", label: "Junya Ito", team: "Japan" },
  { id: "JPN19", label: "Koki Ogawa", team: "Japan" },
  { id: "JPN20", label: "Ayase Ueda", team: "Japan" },

  // Sweden
  { id: "SWE1", label: "Team Logo", team: "Sweden", foil: true },
  { id: "SWE2", label: "Victor Johansson", team: "Sweden" },
  { id: "SWE3", label: "Isak Hien", team: "Sweden" },
  { id: "SWE4", label: "Gabriel Gudmundsson", team: "Sweden" },
  { id: "SWE5", label: "Emil Holm", team: "Sweden" },
  { id: "SWE6", label: "Victor Nilsson Lindelöf", team: "Sweden" },
  { id: "SWE7", label: "Gustaf Lagerbielke", team: "Sweden" },
  { id: "SWE8", label: "Lucas Bergvall", team: "Sweden" },
  { id: "SWE9", label: "Hugo Larsson", team: "Sweden" },
  { id: "SWE10", label: "Jesper Karlström", team: "Sweden" },
  { id: "SWE11", label: "Yasin Ayari", team: "Sweden" },
  { id: "SWE12", label: "Mattias Svanberg", team: "Sweden" },
  { id: "SWE13", label: "Team Photo", team: "Sweden" },
  { id: "SWE14", label: "Daniel Svensson", team: "Sweden" },
  { id: "SWE15", label: "Ken Sema", team: "Sweden" },
  { id: "SWE16", label: "Roony Bardghji", team: "Sweden" },
  { id: "SWE17", label: "Dejan Kulusevski", team: "Sweden" },
  { id: "SWE18", label: "Anthony Elanga", team: "Sweden" },
  { id: "SWE19", label: "Alexander Isak", team: "Sweden" },
  { id: "SWE20", label: "Viktor Gyökeres", team: "Sweden" },

  // Tunisia
  { id: "TUN1", label: "Team Logo", team: "Tunisia", foil: true },
  { id: "TUN2", label: "Bechir Ben Said", team: "Tunisia" },
  { id: "TUN3", label: "Aymen Dahmen", team: "Tunisia" },
  { id: "TUN4", label: "Yan Valery", team: "Tunisia" },
  { id: "TUN5", label: "Montassar Talbi", team: "Tunisia" },
  { id: "TUN6", label: "Yassine Meriah", team: "Tunisia" },
  { id: "TUN7", label: "Ali Abdi", team: "Tunisia" },
  { id: "TUN8", label: "Dylan Bronn", team: "Tunisia" },
  { id: "TUN9", label: "Ellyes Skhiri", team: "Tunisia" },
  { id: "TUN10", label: "Aissa Laidouni", team: "Tunisia" },
  { id: "TUN11", label: "Ferjani Sassi", team: "Tunisia" },
  { id: "TUN12", label: "Mohamed Ali Ben Romdhane", team: "Tunisia" },
  { id: "TUN13", label: "Team Photo", team: "Tunisia" },
  { id: "TUN14", label: "Hannibal Mejbri", team: "Tunisia" },
  { id: "TUN15", label: "Elias Achouri", team: "Tunisia" },
  { id: "TUN16", label: "Elias Saad", team: "Tunisia" },
  { id: "TUN17", label: "Hazem Mastouri", team: "Tunisia" },
  { id: "TUN18", label: "Ismael Gharbi", team: "Tunisia" },
  { id: "TUN19", label: "Sayfallah Ltaief", team: "Tunisia" },
  { id: "TUN20", label: "Naim Sliti", team: "Tunisia" },

  // Belgium
  { id: "BEL1", label: "Team Logo", team: "Belgium", foil: true },
  { id: "BEL2", label: "Thibaut Courtois", team: "Belgium" },
  { id: "BEL3", label: "Arthur Theate", team: "Belgium" },
  { id: "BEL4", label: "Timothy Castagne", team: "Belgium" },
  { id: "BEL5", label: "Zeno Debast", team: "Belgium" },
  { id: "BEL6", label: "Brandon Mechele", team: "Belgium" },
  { id: "BEL7", label: "Maxim De Cuyper", team: "Belgium" },
  { id: "BEL8", label: "Thomas Meunier", team: "Belgium" },
  { id: "BEL9", label: "Youri Tielemans", team: "Belgium" },
  { id: "BEL10", label: "Amadou Onana", team: "Belgium" },
  { id: "BEL11", label: "Nicolas Raskin", team: "Belgium" },
  { id: "BEL12", label: "Alexis Saelemaekers", team: "Belgium" },
  { id: "BEL13", label: "Team Photo", team: "Belgium" },
  { id: "BEL14", label: "Hans Vanaken", team: "Belgium" },
  { id: "BEL15", label: "Kevin De Bruyne", team: "Belgium" },
  { id: "BEL16", label: "Jérémy Doku", team: "Belgium" },
  { id: "BEL17", label: "Charles De Ketelaere", team: "Belgium" },
  { id: "BEL18", label: "Leandro Trossard", team: "Belgium" },
  { id: "BEL19", label: "Loïs Openda", team: "Belgium" },
  { id: "BEL20", label: "Romelu Lukaku", team: "Belgium" },

  // Egypt
  { id: "EGY1", label: "Team Logo", team: "Egypt", foil: true },
  { id: "EGY2", label: "Mohamed El Shenawy", team: "Egypt" },
  { id: "EGY3", label: "Mohamed Hany", team: "Egypt" },
  { id: "EGY4", label: "Mohamed Hamdy", team: "Egypt" },
  { id: "EGY5", label: "Yasser Ibrahim", team: "Egypt" },
  { id: "EGY6", label: "Khaled Sobhi", team: "Egypt" },
  { id: "EGY7", label: "Ramy Rabia", team: "Egypt" },
  { id: "EGY8", label: "Hossam Abdelmaguid", team: "Egypt" },
  { id: "EGY9", label: "Ahmed Fatouh", team: "Egypt" },
  { id: "EGY10", label: "Marwan Attia", team: "Egypt" },
  { id: "EGY11", label: "Zizo", team: "Egypt" },
  { id: "EGY12", label: "Hamdy Fathy", team: "Egypt" },
  { id: "EGY13", label: "Team Photo", team: "Egypt" },
  { id: "EGY14", label: "Mohamed Lasheen", team: "Egypt" },
  { id: "EGY15", label: "Emam Ashour", team: "Egypt" },
  { id: "EGY16", label: "Osama Faisal", team: "Egypt" },
  { id: "EGY17", label: "Mohamed Salah", team: "Egypt" },
  { id: "EGY18", label: "Mostafa Mohamed", team: "Egypt" },
  { id: "EGY19", label: "Trezeguet", team: "Egypt" },
  { id: "EGY20", label: "Omar Marmoush", team: "Egypt" },

  // Iran
  { id: "IRN1", label: "Team Logo", team: "Iran", foil: true },
  { id: "IRN2", label: "Alireza Beiranvand", team: "Iran" },
  { id: "IRN3", label: "Morteza Pouraliganji", team: "Iran" },
  { id: "IRN4", label: "Ehsan Hajsafi", team: "Iran" },
  { id: "IRN5", label: "Milad Mohammadi", team: "Iran" },
  { id: "IRN6", label: "Shojae Khalilzadeh", team: "Iran" },
  { id: "IRN7", label: "Ramin Rezaeian", team: "Iran" },
  { id: "IRN8", label: "Hossein Kanaani", team: "Iran" },
  { id: "IRN9", label: "Sadegh Moharrami", team: "Iran" },
  { id: "IRN10", label: "Saleh Hardani", team: "Iran" },
  { id: "IRN11", label: "Saeed Ezatolahi", team: "Iran" },
  { id: "IRN12", label: "Saman Ghoddos", team: "Iran" },
  { id: "IRN13", label: "Team Photo", team: "Iran" },
  { id: "IRN14", label: "Omid Noorafkan", team: "Iran" },
  { id: "IRN15", label: "Roozbeh Cheshmi", team: "Iran" },
  { id: "IRN16", label: "Mohammad Mohebi", team: "Iran" },
  { id: "IRN17", label: "Sardar Azmoun", team: "Iran" },
  { id: "IRN18", label: "Mehdi Taremi", team: "Iran" },
  { id: "IRN19", label: "Alireza Jahanbakhsh", team: "Iran" },
  { id: "IRN20", label: "Ali Gholizadeh", team: "Iran" },

  // New Zealand
  { id: "NZL1", label: "Team Logo", team: "New Zealand", foil: true },
  { id: "NZL2", label: "Max Crocombe Payne", team: "New Zealand" },
  { id: "NZL3", label: "Alex Paulsen", team: "New Zealand" },
  { id: "NZL4", label: "Michael Boxall", team: "New Zealand" },
  { id: "NZL5", label: "Liberato Cacace", team: "New Zealand" },
  { id: "NZL6", label: "Tim Payne", team: "New Zealand" },
  { id: "NZL7", label: "Tyler Bindon", team: "New Zealand" },
  { id: "NZL8", label: "Francis de Vries", team: "New Zealand" },
  { id: "NZL9", label: "Finn Surman", team: "New Zealand" },
  { id: "NZL10", label: "Joe Bell", team: "New Zealand" },
  { id: "NZL11", label: "Sarpreet Singh", team: "New Zealand" },
  { id: "NZL12", label: "Ryan Thomas", team: "New Zealand" },
  { id: "NZL13", label: "Team Photo", team: "New Zealand" },
  { id: "NZL14", label: "Matthew Garbett", team: "New Zealand" },
  { id: "NZL15", label: "Marko Stamenić", team: "New Zealand" },
  { id: "NZL16", label: "Ben Old", team: "New Zealand" },
  { id: "NZL17", label: "Chris Wood", team: "New Zealand" },
  { id: "NZL18", label: "Elijah Just", team: "New Zealand" },
  { id: "NZL19", label: "Callum McCowatt", team: "New Zealand" },
  { id: "NZL20", label: "Kosta Barbarouses", team: "New Zealand" },

  // Spain
  { id: "ESP1", label: "Team Logo", team: "Spain", foil: true },
  { id: "ESP2", label: "Unai Simon", team: "Spain" },
  { id: "ESP3", label: "Robin Le Normand", team: "Spain" },
  { id: "ESP4", label: "Aymeric Laporte", team: "Spain" },
  { id: "ESP5", label: "Dean Huijsen", team: "Spain" },
  { id: "ESP6", label: "Pedro Porro", team: "Spain" },
  { id: "ESP7", label: "Dani Carvajal", team: "Spain" },
  { id: "ESP8", label: "Marc Cucurella", team: "Spain" },
  { id: "ESP9", label: "Martín Zubimendi", team: "Spain" },
  { id: "ESP10", label: "Rodri", team: "Spain" },
  { id: "ESP11", label: "Pedri", team: "Spain" },
  { id: "ESP12", label: "Fabian Ruiz", team: "Spain" },
  { id: "ESP13", label: "Team Photo", team: "Spain" },
  { id: "ESP14", label: "Mikel Merino", team: "Spain" },
  { id: "ESP15", label: "Lamine Yamal", team: "Spain" },
  { id: "ESP16", label: "Dani Olmo", team: "Spain" },
  { id: "ESP17", label: "Nico Williams", team: "Spain" },
  { id: "ESP18", label: "Ferran Torres", team: "Spain" },
  { id: "ESP19", label: "Álvaro Morata", team: "Spain" },
  { id: "ESP20", label: "Mikel Oyarzabal", team: "Spain" },

  // Cape Verde
  { id: "CPV1", label: "Team Logo", team: "Cape Verde", foil: true },
  { id: "CPV2", label: "Vozinha", team: "Cape Verde" },
  { id: "CPV3", label: "Logan Costa", team: "Cape Verde" },
  { id: "CPV4", label: "Pico", team: "Cape Verde" },
  { id: "CPV5", label: "Diney", team: "Cape Verde" },
  { id: "CPV6", label: "Steven Moreira", team: "Cape Verde" },
  { id: "CPV7", label: "Wagner Pina", team: "Cape Verde" },
  { id: "CPV8", label: "Joao Paulo", team: "Cape Verde" },
  { id: "CPV9", label: "Yannick Semedo", team: "Cape Verde" },
  { id: "CPV10", label: "Kevin Pina", team: "Cape Verde" },
  { id: "CPV11", label: "Patrick Andrade", team: "Cape Verde" },
  { id: "CPV12", label: "Jamiro Monteiro", team: "Cape Verde" },
  { id: "CPV13", label: "Team Photo", team: "Cape Verde" },
  { id: "CPV14", label: "Deroy Duarte", team: "Cape Verde" },
  { id: "CPV15", label: "Garry Rodrigues", team: "Cape Verde" },
  { id: "CPV16", label: "Jovane Cabral", team: "Cape Verde" },
  { id: "CPV17", label: "Ryan Mendes", team: "Cape Verde" },
  { id: "CPV18", label: "Dailon Livramento", team: "Cape Verde" },
  { id: "CPV19", label: "Willy Semedo", team: "Cape Verde" },
  { id: "CPV20", label: "Bebe", team: "Cape Verde" },

  // Saudi Arabia
  { id: "KSA1", label: "Team Logo", team: "Saudi Arabia", foil: true },
  { id: "KSA2", label: "Nawaf Alaqidi", team: "Saudi Arabia" },
  { id: "KSA3", label: "Abdulrahman Al-Sanbi", team: "Saudi Arabia" },
  { id: "KSA4", label: "Saud Abdulhamid", team: "Saudi Arabia" },
  { id: "KSA5", label: "Nawaf Bouwashl", team: "Saudi Arabia" },
  { id: "KSA6", label: "Jihad Thakri", team: "Saudi Arabia" },
  { id: "KSA7", label: "Moteb Al-Harbi", team: "Saudi Arabia" },
  { id: "KSA8", label: "Hassan Altambakti", team: "Saudi Arabia" },
  { id: "KSA9", label: "Musab Aljuwayr", team: "Saudi Arabia" },
  { id: "KSA10", label: "Ziyad Aljohani", team: "Saudi Arabia" },
  { id: "KSA11", label: "Abdullah Alkhaibari", team: "Saudi Arabia" },
  { id: "KSA12", label: "Nasser Aldawsari", team: "Saudi Arabia" },
  { id: "KSA13", label: "Team Photo", team: "Saudi Arabia" },
  { id: "KSA14", label: "Saleh Abu Alshamat", team: "Saudi Arabia" },
  { id: "KSA15", label: "Marwan Alsahafi", team: "Saudi Arabia" },
  { id: "KSA16", label: "Salem Aldawsari", team: "Saudi Arabia" },
  { id: "KSA17", label: "Abdulrahman Al-Aboud", team: "Saudi Arabia" },
  { id: "KSA18", label: "Feras Akbrikan", team: "Saudi Arabia" },
  { id: "KSA19", label: "Saleh Alshehri", team: "Saudi Arabia" },
  { id: "KSA20", label: "Abdullah Al-Hamdan", team: "Saudi Arabia" },

  // Uruguay
  { id: "URU1", label: "Team Logo", team: "Uruguay", foil: true },
  { id: "URU2", label: "Sergio Rochet", team: "Uruguay" },
  { id: "URU3", label: "Santiago Mele", team: "Uruguay" },
  { id: "URU4", label: "Ronald Araujo", team: "Uruguay" },
  { id: "URU5", label: "José María Giménez", team: "Uruguay" },
  { id: "URU6", label: "Sebastian Caceres", team: "Uruguay" },
  { id: "URU7", label: "Mathias Olivera", team: "Uruguay" },
  { id: "URU8", label: "Guillermo Varela", team: "Uruguay" },
  { id: "URU9", label: "Nahitan Nandez", team: "Uruguay" },
  { id: "URU10", label: "Federico Valverde", team: "Uruguay" },
  { id: "URU11", label: "Giorgian De Arrascaeta", team: "Uruguay" },
  { id: "URU12", label: "Rodrigo Bentancur", team: "Uruguay" },
  { id: "URU13", label: "Team Photo", team: "Uruguay" },
  { id: "URU14", label: "Manuel Ugarte", team: "Uruguay" },
  { id: "URU15", label: "Nicolás de la Cruz", team: "Uruguay" },
  { id: "URU16", label: "Maxi Araujo", team: "Uruguay" },
  { id: "URU17", label: "Darwin Núñez", team: "Uruguay" },
  { id: "URU18", label: "Federico Viñas", team: "Uruguay" },
  { id: "URU19", label: "Rodrigo Aguirre", team: "Uruguay" },
  { id: "URU20", label: "Facundo Pellistri", team: "Uruguay" },

  // France
  { id: "FRA1", label: "Team Logo", team: "France", foil: true },
  { id: "FRA2", label: "Mike Maignan", team: "France" },
  { id: "FRA3", label: "Theo Hernandez", team: "France" },
  { id: "FRA4", label: "William Saliba", team: "France" },
  { id: "FRA5", label: "Jules Kounde", team: "France" },
  { id: "FRA6", label: "Ibrahima Konate", team: "France" },
  { id: "FRA7", label: "Dayot Upamecano", team: "France" },
  { id: "FRA8", label: "Lucas Digne", team: "France" },
  { id: "FRA9", label: "Aurélien Tchouaméni", team: "France" },
  { id: "FRA10", label: "Eduardo Camavinga", team: "France" },
  { id: "FRA11", label: "Manu Kone", team: "France" },
  { id: "FRA12", label: "Adrien Rabiot", team: "France" },
  { id: "FRA13", label: "Team Photo", team: "France" },
  { id: "FRA14", label: "Michael Olise", team: "France" },
  { id: "FRA15", label: "Ousmane Dembele", team: "France" },
  { id: "FRA16", label: "Bradley Barcola", team: "France" },
  { id: "FRA17", label: "Désiré Doué", team: "France" },
  { id: "FRA18", label: "Kingsley Coman", team: "France" },
  { id: "FRA19", label: "Hugo Ekitike", team: "France" },
  { id: "FRA20", label: "Kylian Mbappe", team: "France" },

  // Senegal
  { id: "SEN1", label: "Team Logo", team: "Senegal", foil: true },
  { id: "SEN2", label: "Edouard Mendy", team: "Senegal" },
  { id: "SEN3", label: "Yehvann Diouf", team: "Senegal" },
  { id: "SEN4", label: "Moussa Niakhaté", team: "Senegal" },
  { id: "SEN5", label: "Abdoulaye Seck", team: "Senegal" },
  { id: "SEN6", label: "Ismail Jakobs", team: "Senegal" },
  { id: "SEN7", label: "El Hadji Malick Diouf", team: "Senegal" },
  { id: "SEN8", label: "Kalidou Koulibaly", team: "Senegal" },
  { id: "SEN9", label: "Idrissa Gana Gueye", team: "Senegal" },
  { id: "SEN10", label: "Pape Matar Sarr", team: "Senegal" },
  { id: "SEN11", label: "Pape Gueye", team: "Senegal" },
  { id: "SEN12", label: "Habib Diarra", team: "Senegal" },
  { id: "SEN13", label: "Team Photo", team: "Senegal" },
  { id: "SEN14", label: "Lamine Camara", team: "Senegal" },
  { id: "SEN15", label: "Sadio Mane", team: "Senegal" },
  { id: "SEN16", label: "Ismaïla Sarr", team: "Senegal" },
  { id: "SEN17", label: "Boulaye Dia", team: "Senegal" },
  { id: "SEN18", label: "Iliman Ndiaye", team: "Senegal" },
  { id: "SEN19", label: "Nicolas Jackson", team: "Senegal" },
  { id: "SEN20", label: "Krepin Diatta", team: "Senegal" },

  // Iraq
  { id: "IRQ1", label: "Team Logo", team: "Iraq", foil: true },
  { id: "IRQ2", label: "Jalal Hassan", team: "Iraq" },
  { id: "IRQ3", label: "Rebin Sulaka", team: "Iraq" },
  { id: "IRQ4", label: "Hussein Ali", team: "Iraq" },
  { id: "IRQ5", label: "Akam Hashem", team: "Iraq" },
  { id: "IRQ6", label: "Merchas Doski", team: "Iraq" },
  { id: "IRQ7", label: "Zaid Tahseen", team: "Iraq" },
  { id: "IRQ8", label: "Manaf Younis", team: "Iraq" },
  { id: "IRQ9", label: "Zidane Iqbal", team: "Iraq" },
  { id: "IRQ10", label: "Amir Al-Ammari", team: "Iraq" },
  { id: "IRQ11", label: "Ibrahim Bavesh", team: "Iraq" },
  { id: "IRQ12", label: "Ali Jasim", team: "Iraq" },
  { id: "IRQ13", label: "Team Photo", team: "Iraq" },
  { id: "IRQ14", label: "Youssef Amyn", team: "Iraq" },
  { id: "IRQ15", label: "Aimar Sher", team: "Iraq" },
  { id: "IRQ16", label: "Marko Farji", team: "Iraq" },
  { id: "IRQ17", label: "Osama Rashid", team: "Iraq" },
  { id: "IRQ18", label: "Ali Al-Hamadi", team: "Iraq" },
  { id: "IRQ19", label: "Aymen Hussein", team: "Iraq" },
  { id: "IRQ20", label: "Mohanad Ali", team: "Iraq" },

  // Norway
  { id: "NOR1", label: "Team Logo", team: "Norway", foil: true },
  { id: "NOR2", label: "Orjan Nyland", team: "Norway" },
  { id: "NOR3", label: "Julian Ryerson", team: "Norway" },
  { id: "NOR4", label: "Leo Ostigård", team: "Norway" },
  { id: "NOR5", label: "Kristoffer Vassbakk Ajer", team: "Norway" },
  { id: "NOR6", label: "Marcus Holmgren Pedersen", team: "Norway" },
  { id: "NOR7", label: "David Møller Wolfe", team: "Norway" },
  { id: "NOR8", label: "Torbjørn Heggem", team: "Norway" },
  { id: "NOR9", label: "Morten Thorsby", team: "Norway" },
  { id: "NOR10", label: "Martin Ødegaard", team: "Norway" },
  { id: "NOR11", label: "Sander Berge", team: "Norway" },
  { id: "NOR12", label: "Andreas Schjelderup", team: "Norway" },
  { id: "NOR13", label: "Team Photo", team: "Norway" },
  { id: "NOR14", label: "Patrick Berg", team: "Norway" },
  { id: "NOR15", label: "Erling Haaland", team: "Norway" },
  { id: "NOR16", label: "Alexander Sørloth", team: "Norway" },
  { id: "NOR17", label: "Aron Dønnum", team: "Norway" },
  { id: "NOR18", label: "Jorgen Strand Larsen", team: "Norway" },
  { id: "NOR19", label: "Antonio Nusa", team: "Norway" },
  { id: "NOR20", label: "Oscar Bobb", team: "Norway" },

  // Argentina
  { id: "ARG1", label: "Team Logo", team: "Argentina", foil: true },
  { id: "ARG2", label: "Emiliano Martinez", team: "Argentina" },
  { id: "ARG3", label: "Nahuel Molina", team: "Argentina" },
  { id: "ARG4", label: "Cristian Romero", team: "Argentina" },
  { id: "ARG5", label: "Nicolas Otamendi", team: "Argentina" },
  { id: "ARG6", label: "Nicolas Tagliafico", team: "Argentina" },
  { id: "ARG7", label: "Leonardo Balerdi", team: "Argentina" },
  { id: "ARG8", label: "Enzo Fernandez", team: "Argentina" },
  { id: "ARG9", label: "Alexis Mac Allister", team: "Argentina" },
  { id: "ARG10", label: "Rodrigo De Paul", team: "Argentina" },
  { id: "ARG11", label: "Exequiel Palacios", team: "Argentina" },
  { id: "ARG12", label: "Leandro Paredes", team: "Argentina" },
  { id: "ARG13", label: "Team Photo", team: "Argentina" },
  { id: "ARG14", label: "Nico Paz", team: "Argentina" },
  { id: "ARG15", label: "Franco Mastantuono", team: "Argentina" },
  { id: "ARG16", label: "Nico Gonzalez", team: "Argentina" },
  { id: "ARG17", label: "Lionel Messi", team: "Argentina" },
  { id: "ARG18", label: "Lautaro Martinez", team: "Argentina" },
  { id: "ARG19", label: "Julian Alvarez", team: "Argentina" },
  { id: "ARG20", label: "Giuliano Simeone", team: "Argentina" },

  // Algeria
  { id: "ALG1", label: "Team Logo", team: "Algeria", foil: true },
  { id: "ALG2", label: "Alexis Guendouz", team: "Algeria" },
  { id: "ALG3", label: "Ramy Bensebaini", team: "Algeria" },
  { id: "ALG4", label: "Youcef Atal", team: "Algeria" },
  { id: "ALG5", label: "Rayan Aït-Nouri", team: "Algeria" },
  { id: "ALG6", label: "Mohamed Amine Tougai", team: "Algeria" },
  { id: "ALG7", label: "Aïssa Mandi", team: "Algeria" },
  { id: "ALG8", label: "Ismael Bennacer", team: "Algeria" },
  { id: "ALG9", label: "Houssem Aquar", team: "Algeria" },
  { id: "ALG10", label: "Hicham Boudaoui", team: "Algeria" },
  { id: "ALG11", label: "Ramiz Zerrouki", team: "Algeria" },
  { id: "ALG12", label: "Nabil Bentalab", team: "Algeria" },
  { id: "ALG13", label: "Team Photo", team: "Algeria" },
  { id: "ALG14", label: "Farés Chaibi", team: "Algeria" },
  { id: "ALG15", label: "Riyad Mahrez", team: "Algeria" },
  { id: "ALG16", label: "Said Benrahma", team: "Algeria" },
  { id: "ALG17", label: "Anis Hadj Moussa", team: "Algeria" },
  { id: "ALG18", label: "Amine Gouiri", team: "Algeria" },
  { id: "ALG19", label: "Baghdad Bounedjah", team: "Algeria" },
  { id: "ALG20", label: "Mohammed Amoura", team: "Algeria" },

  // Austria
  { id: "AUT1", label: "Team Logo", team: "Austria", foil: true },
  { id: "AUT2", label: "Alexander Schlager", team: "Austria" },
  { id: "AUT3", label: "Patrick Pentz", team: "Austria" },
  { id: "AUT4", label: "David Alaba", team: "Austria" },
  { id: "AUT5", label: "Kevin Danso", team: "Austria" },
  { id: "AUT6", label: "Philipp Lienhart", team: "Austria" },
  { id: "AUT7", label: "Stefan Posch", team: "Austria" },
  { id: "AUT8", label: "Phillipp Mwene", team: "Austria" },
  { id: "AUT9", label: "Alexander Prass", team: "Austria" },
  { id: "AUT10", label: "Xaver Schlager", team: "Austria" },
  { id: "AUT11", label: "Marcel Sabitzer", team: "Austria" },
  { id: "AUT12", label: "Konrad Laimer", team: "Austria" },
  { id: "AUT13", label: "Team Photo", team: "Austria" },
  { id: "AUT14", label: "Florian Grillitsch", team: "Austria" },
  { id: "AUT15", label: "Nicolas Seiwald", team: "Austria" },
  { id: "AUT16", label: "Romano Schmid", team: "Austria" },
  { id: "AUT17", label: "Patrick Wimmer", team: "Austria" },
  { id: "AUT18", label: "Christoph Baumgartner", team: "Austria" },
  { id: "AUT19", label: "Michael Gregoritsch", team: "Austria" },
  { id: "AUT20", label: "Marko Arnautović", team: "Austria" },

  // Jordan
  { id: "JOR1", label: "Team Logo", team: "Jordan", foil: true },
  { id: "JOR2", label: "Yazeed Abulaila", team: "Jordan" },
  { id: "JOR3", label: "Ihsan Haddad", team: "Jordan" },
  { id: "JOR4", label: "Mohammad Abu Hashish", team: "Jordan" },
  { id: "JOR5", label: "Yazan Al-Arab", team: "Jordan" },
  { id: "JOR6", label: "Abdallah Nasib", team: "Jordan" },
  { id: "JOR7", label: "Saleem Obaid", team: "Jordan" },
  { id: "JOR8", label: "Mohammad Abualnadi", team: "Jordan" },
  { id: "JOR9", label: "Ibrahim Saadeh", team: "Jordan" },
  { id: "JOR10", label: "Nizar Al-Rashdan", team: "Jordan" },
  { id: "JOR11", label: "Noor Al-Rawabdeh", team: "Jordan" },
  { id: "JOR12", label: "Mohannad Abu Taha", team: "Jordan" },
  { id: "JOR13", label: "Team Photo", team: "Jordan" },
  { id: "JOR14", label: "Amer Jamous", team: "Jordan" },
  { id: "JOR15", label: "Musa Al-Taamari", team: "Jordan" },
  { id: "JOR16", label: "Yazan Al-Naimat", team: "Jordan" },
  { id: "JOR17", label: "Mahmoud Al-Mardi", team: "Jordan" },
  { id: "JOR18", label: "Ali Olwan", team: "Jordan" },
  { id: "JOR19", label: "Mohammad Abu Zrayq", team: "Jordan" },
  { id: "JOR20", label: "Ibrahim Sabra", team: "Jordan" },

  // Portugal
  { id: "POR1", label: "Team Logo", team: "Portugal", foil: true },
  { id: "POR2", label: "Diogo Costa", team: "Portugal" },
  { id: "POR3", label: "José Sá", team: "Portugal" },
  { id: "POR4", label: "Ruben Dias", team: "Portugal" },
  { id: "POR5", label: "João Cancelo", team: "Portugal" },
  { id: "POR6", label: "Diogo Dalot", team: "Portugal" },
  { id: "POR7", label: "Nuno Mendes", team: "Portugal" },
  { id: "POR8", label: "António Silva", team: "Portugal" },
  { id: "POR9", label: "Vitinha", team: "Portugal" },
  { id: "POR10", label: "Rúben Neves", team: "Portugal" },
  { id: "POR11", label: "João Palhinha", team: "Portugal" },
  { id: "POR12", label: "Bruno Fernandes", team: "Portugal" },
  { id: "POR13", label: "Team Photo", team: "Portugal" },
  { id: "POR14", label: "Bernardo Silva", team: "Portugal" },
  { id: "POR15", label: "Pedro Neto", team: "Portugal" },
  { id: "POR16", label: "Rafael Leão", team: "Portugal" },
  { id: "POR17", label: "Cristiano Ronaldo", team: "Portugal" },
  { id: "POR18", label: "Goncalo Ramos", team: "Portugal" },
  { id: "POR19", label: "João Félix", team: "Portugal" },
  { id: "POR20", label: "Francisco Conceição", team: "Portugal" },

  // Panama
  { id: "PAN1", label: "Team Logo", team: "Panama", foil: true },
  { id: "PAN2", label: "Orlando Mosquera", team: "Panama" },
  { id: "PAN3", label: "Luis Mejia", team: "Panama" },
  { id: "PAN4", label: "Fidel Escobar", team: "Panama" },
  { id: "PAN5", label: "Andres Andrade", team: "Panama" },
  { id: "PAN6", label: "Michael Amir Murillo", team: "Panama" },
  { id: "PAN7", label: "Eric Davis", team: "Panama" },
  { id: "PAN8", label: "Jose Cordoba", team: "Panama" },
  { id: "PAN9", label: "Cesar Blackman", team: "Panama" },
  { id: "PAN10", label: "Cristian Martinez", team: "Panama" },
  { id: "PAN11", label: "Aníbal Godoy", team: "Panama" },
  { id: "PAN12", label: "Adalberto Carrasquilla", team: "Panama" },
  { id: "PAN13", label: "Team Photo", team: "Panama" },
  { id: "PAN14", label: "Édgar Bárcenas", team: "Panama" },
  { id: "PAN15", label: "Carlos Harvey", team: "Panama" },
  { id: "PAN16", label: "Ismael Díaz", team: "Panama" },
  { id: "PAN17", label: "Jose Fajardo", team: "Panama" },
  { id: "PAN18", label: "Cecilio Waterman", team: "Panama" },
  { id: "PAN19", label: "Jose Luiz Rodriguez", team: "Panama" },
  { id: "PAN20", label: "Alberto Quintero", team: "Panama" },

  // Colombia
  { id: "COL1", label: "Team Logo", team: "Colombia", foil: true },
  { id: "COL2", label: "Camilo Vargas", team: "Colombia" },
  { id: "COL3", label: "Daniel Munoz", team: "Colombia" },
  { id: "COL4", label: "Davinson Sánchez", team: "Colombia" },
  { id: "COL5", label: "Yerry Mina", team: "Colombia" },
  { id: "COL6", label: "Johan Mojica", team: "Colombia" },
  { id: "COL7", label: "Santiago Arias", team: "Colombia" },
  { id: "COL8", label: "Wilmar Barrios", team: "Colombia" },
  { id: "COL9", label: "Mateus Uribe", team: "Colombia" },
  { id: "COL10", label: "Richard Rios", team: "Colombia" },
  { id: "COL11", label: "Juan Cuadrado", team: "Colombia" },
  { id: "COL12", label: "Jefferson Lerma", team: "Colombia" },
  { id: "COL13", label: "Team Photo", team: "Colombia" },
  { id: "COL14", label: "James Rodriguez", team: "Colombia" },
  { id: "COL15", label: "Daniel Cataño", team: "Colombia" },
  { id: "COL16", label: "Luis Sinisterra", team: "Colombia" },
  { id: "COL17", label: "Luis Diaz", team: "Colombia" },
  { id: "COL18", label: "Jhon Córdoba", team: "Colombia" },
  { id: "COL19", label: "Radamel Falcao", team: "Colombia" },
  { id: "COL20", label: "Rafael Santos Borré", team: "Colombia" },

  // Croatia
  { id: "CRO1", label: "Team Logo", team: "Croatia", foil: true },
  { id: "CRO2", label: "Dominik Livaković", team: "Croatia" },
  { id: "CRO3", label: "Josip Juranović", team: "Croatia" },
  { id: "CRO4", label: "Duje Ćaleta-Car", team: "Croatia" },
  { id: "CRO5", label: "Domagoj Vida", team: "Croatia" },
  { id: "CRO6", label: "Borna Barišić", team: "Croatia" },
  { id: "CRO7", label: "Josip Stanisić", team: "Croatia" },
  { id: "CRO8", label: "Luka Modrić", team: "Croatia" },
  { id: "CRO9", label: "Mateo Kovačić", team: "Croatia" },
  { id: "CRO10", label: "Marcelo Brozović", team: "Croatia" },
  { id: "CRO11", label: "Lovro Majer", team: "Croatia" },
  { id: "CRO12", label: "Mario Pašalić", team: "Croatia" },
  { id: "CRO13", label: "Team Photo", team: "Croatia" },
  { id: "CRO14", label: "Nikola Vlašić", team: "Croatia" },
  { id: "CRO15", label: "Borna Sosa", team: "Croatia" },
  { id: "CRO16", label: "Ivan Perišić", team: "Croatia" },
  { id: "CRO17", label: "Ante Budimir", team: "Croatia" },
  { id: "CRO18", label: "Bruno Petković", team: "Croatia" },
  { id: "CRO19", label: "Andrej Kramarić", team: "Croatia" },
  { id: "CRO20", label: "Luka Ivanušec", team: "Croatia" },

  // Ghana
  { id: "GHA1", label: "Team Logo", team: "Ghana", foil: true },
  { id: "GHA2", label: "Lawrence Ati Zigi", team: "Ghana" },
  { id: "GHA3", label: "Andrew Yiadom", team: "Ghana" },
  { id: "GHA4", label: "Daniel Amartey", team: "Ghana" },
  { id: "GHA5", label: "Abdul Mumin", team: "Ghana" },
  { id: "GHA6", label: "Gideon Mensah", team: "Ghana" },
  { id: "GHA7", label: "Denis Odoi", team: "Ghana" },
  { id: "GHA8", label: "Thomas Partey", team: "Ghana" },
  { id: "GHA9", label: "Mohammed Kudus", team: "Ghana" },
  { id: "GHA10", label: "Salis Abdul Samed", team: "Ghana" },
  { id: "GHA11", label: "Jordan Ayew", team: "Ghana" },
  { id: "GHA12", label: "Elisha Owusu", team: "Ghana" },
  { id: "GHA13", label: "Team Photo", team: "Ghana" },
  { id: "GHA14", label: "Antoine Semenyo", team: "Ghana" },
  { id: "GHA15", label: "Ernest Nuamah", team: "Ghana" },
  { id: "GHA16", label: "Inaki Williams", team: "Ghana" },
  { id: "GHA17", label: "Andre Ayew", team: "Ghana" },
  { id: "GHA18", label: "Abdul Fatawu Issahaku", team: "Ghana" },
  { id: "GHA19", label: "Osman Bukari", team: "Ghana" },
  { id: "GHA20", label: "Emmanuel Gyasi", team: "Ghana" },

  // Uzbekistan
  { id: "UZB1", label: "Team Logo", team: "Uzbekistan", foil: true },
  { id: "UZB2", label: "Eldor Shomurodov", team: "Uzbekistan" },
  { id: "UZB3", label: "Jasur Yakhshiboev", team: "Uzbekistan" },
  { id: "UZB4", label: "Sanjar Tursunov", team: "Uzbekistan" },
  { id: "UZB5", label: "Abbos Fayzullaev", team: "Uzbekistan" },
  { id: "UZB6", label: "Husayn Norchaev", team: "Uzbekistan" },
  { id: "UZB7", label: "Bobur Abdikholiqov", team: "Uzbekistan" },
  { id: "UZB8", label: "Odil Ahmedov", team: "Uzbekistan" },
  { id: "UZB9", label: "Jaloliddin Masharipov", team: "Uzbekistan" },
  { id: "UZB10", label: "Dostonbek Khamdamov", team: "Uzbekistan" },
  { id: "UZB11", label: "Sherzod Nasrullaev", team: "Uzbekistan" },
  { id: "UZB12", label: "Ruslan Nishonov", team: "Uzbekistan" },
  { id: "UZB13", label: "Team Photo", team: "Uzbekistan" },
  { id: "UZB14", label: "Khurshid Tursunov", team: "Uzbekistan" },
  { id: "UZB15", label: "Timur Kapadze", team: "Uzbekistan" },
  { id: "UZB16", label: "Oybek Dzhaksybekov", team: "Uzbekistan" },
  { id: "UZB17", label: "Shokhrukh Khamdamov", team: "Uzbekistan" },
  { id: "UZB18", label: "Islom Tukhtakhujaev", team: "Uzbekistan" },
  { id: "UZB19", label: "Ildar Amadov", team: "Uzbekistan" },
  { id: "UZB20", label: "Nodir Tursunov", team: "Uzbekistan" },

  // England
  { id: "ENG1", label: "Team Logo", team: "England", foil: true },
  { id: "ENG2", label: "Jordan Pickford", team: "England" },
  { id: "ENG3", label: "Nick Pope", team: "England" },
  { id: "ENG4", label: "Harry Maguire", team: "England" },
  { id: "ENG5", label: "John Stones", team: "England" },
  { id: "ENG6", label: "Kyle Walker", team: "England" },
  { id: "ENG7", label: "Luke Shaw", team: "England" },
  { id: "ENG8", label: "Trent Alexander-Arnold", team: "England" },
  { id: "ENG9", label: "Declan Rice", team: "England" },
  { id: "ENG10", label: "Jude Bellingham", team: "England" },
  { id: "ENG11", label: "Phil Foden", team: "England" },
  { id: "ENG12", label: "Kobbie Mainoo", team: "England" },
  { id: "ENG13", label: "Team Photo", team: "England" },
  { id: "ENG14", label: "Cole Palmer", team: "England" },
  { id: "ENG15", label: "Bukayo Saka", team: "England" },
  { id: "ENG16", label: "Marcus Rashford", team: "England" },
  { id: "ENG17", label: "Harry Kane", team: "England" },
  { id: "ENG18", label: "Ollie Watkins", team: "England" },
  { id: "ENG19", label: "Anthony Gordon", team: "England" },
  { id: "ENG20", label: "Marc Guéhi", team: "England" },

  // DR Congo
  { id: "COD1", label: "Team Logo", team: "DR Congo", foil: true },
  { id: "COD2", label: "Joël Kiassumbua", team: "DR Congo" },
  { id: "COD3", label: "Saturnin Alamba", team: "DR Congo" },
  { id: "COD4", label: "Chancel Mbemba", team: "DR Congo" },
  { id: "COD5", label: "Christian Luyindama", team: "DR Congo" },
  { id: "COD6", label: "Marcel Tisserand", team: "DR Congo" },
  { id: "COD7", label: "Arthur Masuaku", team: "DR Congo" },
  { id: "COD8", label: "Cédric Ibara", team: "DR Congo" },
  { id: "COD9", label: "Samuel Moutoussamy", team: "DR Congo" },
  { id: "COD10", label: "Gaël Kakuta", team: "DR Congo" },
  { id: "COD11", label: "Dodi Lukébakio", team: "DR Congo" },
  { id: "COD12", label: "Meschak Elia", team: "DR Congo" },
  { id: "COD13", label: "Team Photo", team: "DR Congo" },
  { id: "COD14", label: "Théo Bongonda", team: "DR Congo" },
  { id: "COD15", label: "Silas Mvumpa", team: "DR Congo" },
  { id: "COD16", label: "Fiston Mayele", team: "DR Congo" },
  { id: "COD17", label: "Cédric Bakambu", team: "DR Congo" },
  { id: "COD18", label: "Yoane Wissa", team: "DR Congo" },
  { id: "COD19", label: "Jonathan Bolingi", team: "DR Congo" },
  { id: "COD20", label: "Benik Afobe", team: "DR Congo" },
];



const ALL_TEAMS = [...new Set(STICKERS.map(s => s.team))];
const TOTAL = STICKERS.length;

// Rarity colors (border colors) — matches NA box parallels
const RARITIES = [
  { id: "base",   label: "Base",   color: "#4a4a6a", hex: "#4a4a6a",  bg: "#13131f" },
  { id: "blue",   label: "Blue",   color: "#3b82f6", hex: "#3b82f6",  bg: "#0a1a35" },
  { id: "red",    label: "Red",    color: "#ef4444", hex: "#ef4444",  bg: "#2a0a0a" },
  { id: "orange", label: "Orange", color: "#f97316", hex: "#f97316",  bg: "#2a1400" },
  { id: "purple", label: "Purple", color: "#a855f7", hex: "#a855f7",  bg: "#1a0a2a" },
  { id: "green",  label: "Green",  color: "#22c55e", hex: "#22c55e",  bg: "#0a2210" },
  { id: "gold",   label: "Gold",   color: "#d4af37", hex: "#d4af37",  bg: "#1a1400" },
  { id: "black",  label: "Black 1/1", color: "#e8e8f0", hex: "#111111", bg: "#111" },
];

const RARITY_MAP = Object.fromEntries(RARITIES.map(r => [r.id, r]));

// collected shape: { [stickerId]: { [rarityId]: count } }
// A sticker is "collected" if it has at least 1 of any rarity

function getRarityForSticker(collectedData, id) {
  return collectedData[id] || {};
}

function totalForSticker(collectedData, id) {
  const r = getRarityForSticker(collectedData, id);
  return Object.values(r).reduce((a, b) => a + b, 0);
}

function hasAny(collectedData, id) {
  return totalForSticker(collectedData, id) > 0;
}

// Modal for adding/editing a sticker's rarity counts
function StickerModal({ sticker, collectedData, onSave, onClose }) {
  const existing = getRarityForSticker(collectedData, sticker.id);
  const [counts, setCounts] = useState(() => {
    const init = {};
    RARITIES.forEach(r => { init[r.id] = existing[r.id] || 0; });
    return init;
  });

  const totalCards = Object.values(counts).reduce((a, b) => a + b, 0);

  const adjust = (rarityId, delta) => {
    setCounts(prev => ({ ...prev, [rarityId]: Math.max(0, (prev[rarityId] || 0) + delta) }));
  };

  const handleSave = () => {
    onSave(sticker.id, counts);
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#13131f", border: "1px solid #2a2a4a", borderRadius: 16, padding: 20, width: "100%", maxWidth: 400, maxHeight: "90vh", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#6666aa", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{sticker.id} · {sticker.team}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#e8e8f0", marginTop: 2 }}>{sticker.label}</div>
            {sticker.foil && <div style={{ fontSize: 11, color: "#d4af37", marginTop: 2 }}>✦ FOIL sticker</div>}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#666", fontSize: 20, cursor: "pointer", lineHeight: 1, padding: 4 }}>✕</button>
        </div>

        <div style={{ fontSize: 12, color: "#6666aa", marginBottom: 12 }}>
          How many of each border color do you have?
        </div>

        {/* Rarity rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {RARITIES.map(r => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "#1a1a2e", borderRadius: 10, padding: "10px 12px", border: `1px solid ${counts[r.id] > 0 ? r.color : "#2a2a4a"}` }}>
              {/* Color swatch */}
              <div style={{ width: 18, height: 18, borderRadius: 4, background: r.hex, border: "2px solid rgba(255,255,255,0.15)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: counts[r.id] > 0 ? r.color : "#8888bb" }}>{r.label}</div>
                {r.id === "base" && <div style={{ fontSize: 10, color: "#555588" }}>Standard sticker</div>}
                {r.id === "blue" && <div style={{ fontSize: 10, color: "#555588" }}>1:2 packs</div>}
                {r.id === "red" && <div style={{ fontSize: 10, color: "#555588" }}>1:25 packs</div>}
                {r.id === "orange" && <div style={{ fontSize: 10, color: "#555588" }}>Amazon exclusive</div>}
                {r.id === "purple" && <div style={{ fontSize: 10, color: "#555588" }}>1:200 packs</div>}
                {r.id === "green" && <div style={{ fontSize: 10, color: "#555588" }}>1:1,400 packs</div>}
                {r.id === "gold" && <div style={{ fontSize: 10, color: "#555588" }}>iCollect exclusive</div>}
                {r.id === "black" && <div style={{ fontSize: 10, color: "#555588" }}>1/1 — ultra rare</div>}
              </div>
              {/* Counter */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => adjust(r.id, -1)}
                  style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #2a2a4a", background: "#0a0a0f", color: "#aaaacc", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >−</button>
                <span style={{ fontSize: 16, fontWeight: 700, color: counts[r.id] > 0 ? r.color : "#444466", minWidth: 20, textAlign: "center" }}>{counts[r.id]}</span>
                <button
                  onClick={() => adjust(r.id, 1)}
                  style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #2a2a4a", background: "#0a0a0f", color: "#aaaacc", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Total summary */}
        <div style={{ marginTop: 14, padding: "10px 12px", background: "#0a0a0f", borderRadius: 10, border: "1px solid #2a2a4a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#8888bb" }}>Total cards for this sticker</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: totalCards > 0 ? "#e040fb" : "#444466" }}>{totalCards}</span>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <button
            onClick={onClose}
            style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1px solid #2a2a4a", background: "#1a1a2e", color: "#8888bb", fontSize: 14, cursor: "pointer" }}
          >Cancel</button>
          <button
            onClick={handleSave}
            style={{ flex: 2, padding: "10px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#7b2ff7,#e040fb)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >Save</button>
        </div>
      </div>
    </div>
  );
}

// Inline rarity dots to show what colors you have
function RarityDots({ rarityData }) {
  const active = RARITIES.filter(r => rarityData[r.id] > 0);
  if (active.length === 0) return null;
  return (
    <div style={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 3 }}>
      {active.map(r => (
        <div key={r.id} title={`${r.label}: ${rarityData[r.id]}x`} style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: r.color }} />
          {rarityData[r.id] > 1 && <span style={{ fontSize: 8, color: r.color, fontWeight: 700 }}>{rarityData[r.id]}</span>}
        </div>
      ))}
    </div>
  );
}

function ScanOverlay({ onClose, onAddToInventory, onLookUp }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const countdownRef = useRef(null);
  const [phase, setPhase] = useState("camera");
  const [capturedB64, setCapturedB64] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [flash, setFlash] = useState(false);
  const [pendingSticker, setPendingSticker] = useState(null);
  const [pendingRarity, setPendingRarity] = useState("base");
  const [correction, setCorrection] = useState("");

  useEffect(() => {
    let mounted = true;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false })
      .then(stream => {
        if (!mounted) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;

        let count = 3;
        countdownRef.current = setInterval(() => {
          count -= 1;
          setCountdown(count);
          if (count <= 0) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
            setFlash(true);
            setTimeout(() => setFlash(false), 350);
            const video = videoRef.current;
            const canvas = canvasRef.current;
            if (video && canvas && mounted) {
              canvas.width = video.videoWidth || 640;
              canvas.height = video.videoHeight || 480;
              canvas.getContext("2d").drawImage(video, 0, 0);
              const b64 = canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
              stream.getTracks().forEach(t => t.stop());
              streamRef.current = null;
              setCapturedB64(b64);
              setPhase("choice");
            }
          }
        }, 1000);
      })
      .catch(() => onClose("error"));
    return () => {
      mounted = false;
      clearInterval(countdownRef.current);
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const stopStream = () => {
    clearInterval(countdownRef.current);
    countdownRef.current = null;
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  };

  const callAPI = async (action) => {
    setPhase("loading");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 300,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: "image/jpeg", data: capturedB64 } },
              { type: "text", text: "This is a Panini FIFA World Cup 2026 sticker card. Identify: 1) The player name or card type like Team Logo or Team Photo, 2) The team name, 3) The sticker ID code if visible like ARG17 or USA3, 4) The border color rarity which is one of: base, blue, red, orange, purple, green, gold, black. Return JSON only, no other text, in this exact format: {\"playerName\": \"\", \"team\": \"\", \"stickerId\": \"\", \"borderColor\": \"\"}" }
            ]
          }]
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("Anthropic API error:", res.status, errData);
        onClose("error");
        return;
      }

      const data = await res.json();
      let text = data.content?.[0]?.text ?? "";
      // Strip markdown code fences Claude sometimes adds
      text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
      const parsed = JSON.parse(text);

      const isPlayer = s => s.label !== "Team Logo" && s.label !== "Team Photo";

      let sticker = null;
      if (parsed.stickerId) {
        sticker = STICKERS.find(s => isPlayer(s) && s.id.toLowerCase() === String(parsed.stickerId).toLowerCase());
      }
      if (!sticker && parsed.playerName && parsed.team) {
        sticker = STICKERS.find(s =>
          isPlayer(s) &&
          s.label.toLowerCase().includes(parsed.playerName.toLowerCase()) &&
          s.team.toLowerCase().includes(parsed.team.toLowerCase())
        );
      }
      if (!sticker && parsed.playerName) {
        sticker = STICKERS.find(s => isPlayer(s) && s.label.toLowerCase().includes(parsed.playerName.toLowerCase()));
      }
      if (!sticker && parsed.team) {
        sticker = STICKERS.find(s => isPlayer(s) && s.team.toLowerCase().includes(parsed.team.toLowerCase()));
      }

      if (!sticker) { setPhase("notfound"); return; }

      const validRarityIds = ["base", "blue", "red", "orange", "purple", "green", "gold", "black"];
      const rarityId = validRarityIds.includes(parsed.borderColor) ? parsed.borderColor : "base";

      if (action === "add") {
        setPendingSticker(sticker);
        setPendingRarity(rarityId);
        setPhase("confirm");
      } else {
        onLookUp(sticker);
      }
    } catch (e) {
      console.error("Scan error:", e);
      onClose("error");
    }
  };

  const retake = () => {
    setCapturedB64(null);
    setCountdown(3);
    setPhase("camera");
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        let count = 3;
        countdownRef.current = setInterval(() => {
          count -= 1;
          setCountdown(count);
          if (count <= 0) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
            setFlash(true);
            setTimeout(() => setFlash(false), 350);
            const video = videoRef.current;
            const canvas = canvasRef.current;
            if (video && canvas) {
              canvas.width = video.videoWidth || 640;
              canvas.height = video.videoHeight || 480;
              canvas.getContext("2d").drawImage(video, 0, 0);
              const b64 = canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
              stream.getTracks().forEach(t => t.stop());
              streamRef.current = null;
              setCapturedB64(b64);
              setPhase("choice");
            }
          }
        }, 1000);
      })
      .catch(() => onClose("error"));
  };

  const handleClose = () => { stopStream(); onClose(); };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "#000" }}>
      <style>{`
        @keyframes scan-spin { to { transform: rotate(360deg); } }
        @keyframes scan-flash { 0% { opacity: 0.85; } 100% { opacity: 0; } }
      `}</style>

      {/* Live video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: phase === "camera" ? "block" : "none" }}
      />

      {/* Captured preview */}
      {capturedB64 && phase !== "camera" && (
        <img
          src={`data:image/jpeg;base64,${capturedB64}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          alt=""
        />
      )}

      {/* Viewfinder with countdown */}
      {phase === "camera" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginBottom: 14, letterSpacing: 0.5 }}>Align card inside the frame</p>
          <div style={{ position: "relative", width: 240, height: 336, border: "2px solid rgba(255,255,255,0.85)", borderRadius: 10, boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {countdown > 0 && (
              <span style={{ fontSize: 96, fontWeight: 800, color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.7)", lineHeight: 1, userSelect: "none" }}>
                {countdown}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Flash overlay */}
      {flash && (
        <div style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 20, animation: "scan-flash 0.35s ease-out forwards", pointerEvents: "none" }} />
      )}

      {/* Cancel */}
      <button
        onClick={handleClose}
        style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", fontSize: 20, cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
      >✕</button>

      {/* Choice buttons — centered */}
      {phase === "choice" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "0 28px", background: "rgba(0,0,0,0.55)", zIndex: 10 }}>
          <p style={{ color: "#e8e8f0", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>What do you want to do?</p>
          <button
            onClick={() => callAPI("add")}
            style={{ width: "100%", maxWidth: 320, padding: "18px", borderRadius: 16, border: "none", background: "linear-gradient(90deg,#7b2ff7,#e040fb)", color: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer" }}
          >+ Add to Inventory</button>
          <button
            onClick={() => callAPI("lookup")}
            style={{ width: "100%", maxWidth: 320, padding: "18px", borderRadius: 16, border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer" }}
          >🔍 Look Up Card</button>
          <button
            onClick={retake}
            style={{ width: "100%", maxWidth: 320, padding: "14px", borderRadius: 16, border: "1.5px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.55)", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
          >↺ Retake</button>
        </div>
      )}

      {/* Confirm */}
      {phase === "confirm" && pendingSticker && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "0 28px", background: "rgba(0,0,0,0.82)", zIndex: 10 }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", margin: 0 }}>Is this the right card?</p>
          <p style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0, textAlign: "center" }}>{pendingSticker.label}</p>
          <p style={{ color: "#b0a0e0", fontSize: 15, fontWeight: 500, margin: 0 }}>{pendingSticker.team} · {pendingSticker.id}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 320, marginTop: 8 }}>
            <button
              onClick={() => onAddToInventory(pendingSticker, pendingRarity)}
              style={{ padding: "18px", borderRadius: 16, border: "none", background: "linear-gradient(90deg,#7b2ff7,#e040fb)", color: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer" }}
            >✓ Yes, add it</button>
            <button
              onClick={() => { setCorrection(""); setPhase("correct"); }}
              style={{ padding: "16px", borderRadius: 16, border: "1.5px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer" }}
            >✎ Wrong player — fix it</button>
            <button
              onClick={retake}
              style={{ padding: "13px", borderRadius: 16, border: "none", background: "transparent", color: "rgba(255,255,255,0.45)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >↺ Retake</button>
          </div>
        </div>
      )}

      {/* Correct — manual search */}
      {phase === "correct" && (() => {
        const q = correction.trim().toLowerCase();
        const isPlayer = s => s.label !== "Team Logo" && s.label !== "Team Photo";
        const results = q.length >= 2
          ? STICKERS.filter(s => isPlayer(s) && (
              s.label.toLowerCase().includes(q) ||
              s.team.toLowerCase().includes(q) ||
              s.id.toLowerCase().includes(q)
            )).slice(0, 8)
          : [];
        return (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "rgba(0,0,0,0.92)", zIndex: 10, padding: "60px 20px 20px" }}>
            <p style={{ color: "#e8e8f0", fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>Who is this player?</p>
            <input
              autoFocus
              value={correction}
              onChange={e => setCorrection(e.target.value)}
              placeholder="Type name or team…"
              style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid #3a3a5a", background: "#1a1a2e", color: "#e8e8f0", fontSize: 16, boxSizing: "border-box", outline: "none" }}
            />
            <div style={{ marginTop: 12, overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {results.length === 0 && q.length >= 2 && (
                <p style={{ color: "#666", fontSize: 14, textAlign: "center", marginTop: 24 }}>No matches</p>
              )}
              {results.map(s => (
                <button
                  key={s.id}
                  onClick={() => onAddToInventory(s, pendingRarity)}
                  style={{ textAlign: "left", padding: "14px 16px", borderRadius: 12, border: "1px solid #2a2a4a", background: "#13131f", color: "#e8e8f0", cursor: "pointer", display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{s.label}</span>
                  <span style={{ color: "#7a6aaa", fontSize: 13 }}>{s.team} · {s.id}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setPhase("confirm")}
              style={{ marginTop: 12, padding: "13px", borderRadius: 12, border: "none", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 14, cursor: "pointer" }}
            >← Back</button>
          </div>
        );
      })()}

      {/* Not found */}
      {phase === "notfound" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "0 28px", background: "rgba(0,0,0,0.75)", zIndex: 10 }}>
          <p style={{ fontSize: 42, margin: 0 }}>🤷</p>
          <p style={{ color: "#e8e8f0", fontSize: 16, fontWeight: 700, margin: 0 }}>Card not found</p>
          <p style={{ color: "#aaaacc", fontSize: 13, textAlign: "center", margin: 0 }}>Couldn't match this to a sticker in the album. Try a clearer shot.</p>
          <button
            onClick={retake}
            style={{ marginTop: 8, width: "100%", maxWidth: 320, padding: "18px", borderRadius: 16, border: "none", background: "linear-gradient(90deg,#7b2ff7,#e040fb)", color: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer" }}
          >↺ Try Again</button>
        </div>
      )}

      {/* Loading spinner */}
      {phase === "loading" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)", zIndex: 10 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", border: "4px solid #2a2a4a", borderTopColor: "#e040fb", animation: "scan-spin 0.75s linear infinite" }} />
          <p style={{ color: "#aaaacc", marginTop: 18, fontSize: 14, fontWeight: 500 }}>Identifying card…</p>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

function ScanToast({ message, color }) {
  return (
    <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: "#13131f", border: `2px solid ${color}`, borderRadius: 14, padding: "13px 20px", color: "#e8e8f0", fontSize: 14, fontWeight: 600, zIndex: 2000, maxWidth: "88vw", textAlign: "center", boxShadow: `0 4px 24px ${color}55`, lineHeight: 1.4 }}>
      {message}
    </div>
  );
}

// ── PAGE STACK NAVIGATION ──
// pages: "home" | "team" | "search-results"
// We keep a stack so back always goes to the previous page

export default function App() {
  // collected: persisted to localStorage
  const [collected, setCollected] = useState(() => {
    try {
      const saved = localStorage.getItem('panini_wc2026');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [modalSticker, setModalSticker] = useState(null);

  // Navigation stack: each entry is { page, params }
  const [navStack, setNavStack] = useState([{ page: "home" }]);
  const currentPage = navStack[navStack.length - 1];
  const canGoBack = navStack.length > 1;

  const navigate = (page, params = {}) => {
    setNavStack(prev => [...prev, { page, params }]);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setNavStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    window.scrollTo(0, 0);
  };

  // Global search (home bar)
  const [globalSearch, setGlobalSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Team page state
  const [showMissing, setShowMissing] = useState(false);
  const [view, setView] = useState("grid");
  const [filterSearch, setFilterSearch] = useState("");

  const handleSave = useCallback((id, counts) => {
    setCollected(prev => {
      const next = { ...prev, [id]: counts };
      try { localStorage.setItem('panini_wc2026', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // Global search results
  const globalResults = useMemo(() => {
    if (!globalSearch.trim()) return [];
    const q = globalSearch.toLowerCase();
    return STICKERS.filter(s =>
      s.label.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      s.team.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [globalSearch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!searchRef.current?.contains(e.target) && !dropdownRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectSearchResult = (sticker) => {
    setGlobalSearch("");
    setShowDropdown(false);
    setFilterSearch(sticker.id);
    navigate("team", { team: sticker.team });
    setModalSticker(sticker);
  };

  // Current team (from nav stack params or "All")
  const activeTeam = currentPage.params?.team || "All";

  // Filtered stickers for collection view
  const filtered = useMemo(() => {
    return STICKERS.filter(s => {
      const matchTeam = activeTeam === "All" || s.team === activeTeam;
      const matchSearch = !filterSearch || s.label.toLowerCase().includes(filterSearch.toLowerCase()) || s.id.toLowerCase().includes(filterSearch.toLowerCase()) || s.team.toLowerCase().includes(filterSearch.toLowerCase());
      const matchMissing = !showMissing || !hasAny(collected, s.id);
      return matchTeam && matchSearch && matchMissing;
    });
  }, [activeTeam, filterSearch, showMissing, collected]);

  // Stats
  const collectedCount = useMemo(() =>
    STICKERS.filter(s => hasAny(collected, s.id)).length,
  [collected]);
  const totalCards = useMemo(() =>
    Object.values(collected).reduce((sum, r) => sum + Object.values(r).reduce((a, b) => a + b, 0), 0),
  [collected]);
  const duplicates = totalCards - collectedCount;
  const pct = Math.round((collectedCount / TOTAL) * 100);

  // Per-rarity breakdown
  const rarityBreakdown = useMemo(() => {
    const counts = {};
    RARITIES.forEach(r => { counts[r.id] = 0; });
    Object.values(collected).forEach(rarityData => {
      RARITIES.forEach(r => { counts[r.id] += rarityData[r.id] || 0; });
    });
    return counts;
  }, [collected]);

  // Per-team stats
  const teamStats = useMemo(() => {
    return ALL_TEAMS.map(team => {
      const stickers = STICKERS.filter(s => s.team === team);
      const have = stickers.filter(s => hasAny(collected, s.id)).length;
      return { team, total: stickers.length, have, pct: Math.round((have / stickers.length) * 100) };
    });
  }, [collected]);

  const exportMissing = () => {
    const missing = STICKERS.filter(s => !hasAny(collected, s.id)).map(s => `${s.id} - ${s.label} (${s.team})`).join('\n');
    const blob = new Blob([missing], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'panini-wc2026-missing.txt';
    a.click();
  };

  const completedMilestones = [25, 50, 75, 90, 100].filter(m => pct >= m);

  // ── SCAN FEATURE ──
  const [scanOpen, setScanOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, color = "#e040fb") => {
    setToast({ message, color });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleScanAdd = useCallback((sticker, rarityId) => {
    setScanOpen(false);
    const rarity = RARITY_MAP[rarityId] || RARITIES[0];
    const existing = collected[sticker.id] || {};
    const newCount = (existing[rarityId] || 0) + 1;
    handleSave(sticker.id, { ...existing, [rarityId]: newCount });
    showToast(`Added ${sticker.label} (${sticker.id}) · ${rarity.label} border · You now have ${newCount}`, rarity.color);
  }, [collected, handleSave, showToast]);

  const handleScanLookUp = useCallback((sticker) => {
    setScanOpen(false);
    setModalSticker(sticker);
  }, []);

  const handleScanClose = useCallback((reason) => {
    setScanOpen(false);
    if (reason === "error") {
      showToast("Could not read card — try better lighting or a closer shot", "#ef4444");
    }
  }, [showToast]);

  // ── SHARED HEADER (sticky, always visible) ──
  const SharedHeader = ({ title, subtitle, showBack }) => (
    <div style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #12122a 50%, #0a1535 100%)", borderBottom: "1px solid #1e1e3a", padding: "14px 16px", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Top nav row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: showBack ? 12 : 0 }}>
          {showBack && (
            <button onClick={goBack} style={{ background: "none", border: "none", color: "#aaaacc", fontSize: 22, cursor: "pointer", padding: "0 4px 0 0", lineHeight: 1, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 20 }}>‹</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#8888bb" }}>Back</span>
            </button>
          )}
          {!showBack && <span style={{ fontSize: 20 }}>⚽</span>}
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: showBack ? 16 : 15, fontWeight: 700, color: "#fff", letterSpacing: -0.3 }}>{title}</h1>
            {subtitle && <p style={{ margin: 0, fontSize: 11, color: "#6666aa" }}>{subtitle}</p>}
          </div>
        </div>

        {/* Progress bar — always shown */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#aaaacc" }}>
                <strong style={{ color: "#e040fb", fontSize: 14 }}>{collectedCount}</strong>
                <span style={{ color: "#555588" }}> / {TOTAL} collected</span>
              </span>
              {completedMilestones.length > 0 && (
                <span style={{ fontSize: 10, background: "#2d1040", border: "1px solid #a855f7", borderRadius: 20, padding: "1px 7px", color: "#d084ff" }}>
                  🎯 {completedMilestones[completedMilestones.length - 1]}%
                </span>
              )}
            </div>
            <span style={{ fontSize: 14, fontWeight: 800, color: pct === 100 ? "#22c55e" : "#e040fb" }}>{pct}%</span>
          </div>
          <div style={{ position: "relative", background: "#1e1e35", borderRadius: 10, height: 10, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#22c55e" : "linear-gradient(90deg, #5b21b6, #7b2ff7, #e040fb)", borderRadius: 10, transition: "width 0.4s ease" }} />
            {[25, 50, 75, 90].map(m => (
              <div key={m} style={{ position: "absolute", left: `${m}%`, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.08)" }} />
            ))}
          </div>
          {totalCards > 0 && (
            <div style={{ display: "flex", gap: 5, marginTop: 6, flexWrap: "wrap" }}>
              {RARITIES.filter(r => rarityBreakdown[r.id] > 0).map(r => (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 3, background: "#1a1a2e", border: `1px solid ${r.color}33`, borderRadius: 6, padding: "1px 6px" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: r.color }} />
                  <span style={{ fontSize: 10, color: r.color, fontWeight: 600 }}>{rarityBreakdown[r.id]}×</span>
                  <span style={{ fontSize: 9, color: "#555588" }}>{r.label}</span>
                </div>
              ))}
              {duplicates > 0 && <div style={{ display: "flex", alignItems: "center", gap: 3, background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 6, padding: "1px 6px" }}><span style={{ fontSize: 10, color: "#888" }}>{duplicates} dupes</span></div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ── HOME PAGE ──
  if (currentPage.page === "home") {
    return (
      <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0a0a0f", minHeight: "100vh", color: "#e8e8f0" }}>
        <SharedHeader title="Panini WC 2026™ Tracker" subtitle={`${collectedCount}/${TOTAL} unique · ${totalCards} total cards`} showBack={false} />

        {/* Global search */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "12px 16px 8px" }}>
          <div style={{ position: "relative" }} ref={searchRef}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#555588" }}>🔍</span>
            <input
              placeholder="Search any player, team, or sticker code..."
              value={globalSearch}
              onChange={e => { setGlobalSearch(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              style={{ width: "100%", padding: "11px 36px 11px 36px", borderRadius: 12, border: "1px solid #2a2a4a", background: "#1a1a2e", color: "#e8e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
            {globalSearch && (
              <button onClick={() => { setGlobalSearch(""); setShowDropdown(false); }} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", fontSize: 16, cursor: "pointer" }}>✕</button>
            )}
            {/* Dropdown */}
            {showDropdown && globalResults.length > 0 && (
              <div ref={dropdownRef} style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#13131f", border: "1px solid #2a2a4a", borderRadius: 12, zIndex: 200, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.7)" }}>
                {globalResults.map(s => {
                  const have = hasAny(collected, s.id);
                  const rd = getRarityForSticker(collected, s.id);
                  return (
                    <div key={s.id} onClick={() => selectSearchResult(s)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", cursor: "pointer", borderBottom: "1px solid #1e1e35" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: have ? "#0d2218" : "#1a1a2e", border: `1px solid ${have ? "#22c55e" : "#2a2a4a"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>
                        {have ? "✓" : "○"}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 7, alignItems: "baseline" }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#6666aa", flexShrink: 0 }}>{s.id}</span>
                          <span style={{ fontSize: 13, color: "#e8e8f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: "#555588" }}>{s.team}</span>
                          {s.foil && <span style={{ fontSize: 10, color: "#d4af37" }}>✦</span>}
                          <RarityDots rarityData={rd} />
                        </div>
                      </div>
                      <span style={{ fontSize: 18, color: "#444466" }}>›</span>
                    </div>
                  );
                })}
              </div>
            )}
            {showDropdown && globalSearch.trim() && globalResults.length === 0 && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#13131f", border: "1px solid #2a2a4a", borderRadius: 12, padding: 14, zIndex: 200, color: "#555588", fontSize: 13 }}>
                No stickers found for "{globalSearch}"
              </div>
            )}
          </div>
        </div>

        {/* Team grid */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "4px 16px 48px" }}>
          <p style={{ fontSize: 12, color: "#444466", margin: "0 0 10px" }}>Tap a team to browse their stickers</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 6 }}>
            {teamStats.map(({ team, total, have, pct: tp }) => (
              <div key={team} onClick={() => { setFilterSearch(""); setShowMissing(false); navigate("team", { team }); }}
                style={{ background: tp === 100 ? "#0d2d1a" : "#13131f", border: `1px solid ${tp === 100 ? "#22c55e" : "#2a2a4a"}`, borderRadius: 10, padding: "10px 12px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: tp === 100 ? "#22c55e" : "#c8c8e8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                    {team === "FWC" ? "🏆 Tournament" : team}
                  </div>
                  <span style={{ fontSize: 18, color: "#333355", flexShrink: 0 }}>›</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, background: "#1e1e35", borderRadius: 4, height: 5 }}>
                    <div style={{ height: "100%", width: `${tp}%`, background: tp === 100 ? "#22c55e" : "linear-gradient(90deg,#7b2ff7,#e040fb)", borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, color: "#666688", flexShrink: 0, fontWeight: 600 }}>{have}/{total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {modalSticker && <StickerModal sticker={modalSticker} collectedData={collected} onSave={handleSave} onClose={() => setModalSticker(null)} />}
        <button onClick={() => setScanOpen(true)} style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#7b2ff7,#e040fb)", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", zIndex: 400, boxShadow: "0 4px 20px rgba(224,64,251,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>📷</button>
        {scanOpen && <ScanOverlay onClose={handleScanClose} onAddToInventory={handleScanAdd} onLookUp={handleScanLookUp} />}
        {toast && <ScanToast message={toast.message} color={toast.color} />}
      </div>
    );
  }

  // ── TEAM PAGE ──
  const teamName = currentPage.params?.team || "All";
  const teamLabel = teamName === "FWC" ? "🏆 Tournament Stickers" : teamName;
  const teamStat = teamStats.find(t => t.team === teamName);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0a0a0f", minHeight: "100vh", color: "#e8e8f0" }}>
      <SharedHeader
        title={teamLabel}
        subtitle={teamStat ? `${teamStat.have}/${teamStat.total} collected · ${teamStat.pct}% complete` : ""}
        showBack={true}
      />

      {/* Team filter controls */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "10px 16px 6px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <input
            placeholder={`Filter ${teamLabel}...`}
            value={filterSearch}
            onChange={e => setFilterSearch(e.target.value)}
            style={{ flex: 1, minWidth: 120, padding: "8px 12px", borderRadius: 8, border: "1px solid #2a2a4a", background: "#1a1a2e", color: "#e8e8f0", fontSize: 13, outline: "none" }}
          />
          <button onClick={() => setShowMissing(m => !m)}
            style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${showMissing ? "#e040fb" : "#2a2a4a"}`, background: showMissing ? "#2d1040" : "#1a1a2e", color: showMissing ? "#e040fb" : "#aaaacc", fontSize: 12, cursor: "pointer" }}>
            {showMissing ? "▼ Missing" : "Missing"}
          </button>
          <button onClick={() => setView(v => v === "grid" ? "list" : "grid")}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #2a2a4a", background: "#1a1a2e", color: "#aaaacc", fontSize: 13, cursor: "pointer" }}>
            {view === "grid" ? "☰" : "⊞"}
          </button>
          <button onClick={exportMissing}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #2a2a4a", background: "#1a1a2e", color: "#aaaacc", fontSize: 13, cursor: "pointer" }}>↓</button>
        </div>
        <p style={{ margin: "6px 0 0", fontSize: 11, color: "#444466" }}>{filtered.length} stickers shown</p>
      </div>

      {/* Sticker grid / list */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 48px" }}>
        {view === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(76px, 1fr))", gap: 5 }}>
            {filtered.map(s => {
              const rd = getRarityForSticker(collected, s.id);
              const have = hasAny(collected, s.id);
              const total = totalForSticker(collected, s.id);
              const topRarity = RARITIES.find(r => (rd[r.id] || 0) > 0 && r.id !== "base");
              const borderColor = have ? (topRarity ? topRarity.color : "#22c55e") : "#2a2a4a";
              return (
                <div key={s.id} onClick={() => setModalSticker(s)}
                  style={{ background: have ? "#0d1a10" : "#13131f", border: `2px solid ${borderColor}`, borderRadius: 8, padding: "6px 4px", cursor: "pointer", textAlign: "center", position: "relative", opacity: have ? 1 : 0.65 }}>
                  {s.foil && <span style={{ position: "absolute", top: 2, right: 3, fontSize: 8, color: "#d4af37" }}>✦</span>}
                  <div style={{ fontSize: 9, fontWeight: 700, color: have ? "#4ade80" : "#6666aa", marginBottom: 1 }}>{s.id}</div>
                  <div style={{ fontSize: 8, color: have ? "#c8c8e8" : "#555588", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</div>
                  {have && (
                    <div style={{ display: "flex", justifyContent: "center", gap: 1, marginTop: 3, flexWrap: "wrap" }}>
                      {RARITIES.filter(r => (rd[r.id] || 0) > 0).map(r => (
                        <div key={r.id} style={{ width: 6, height: 6, borderRadius: "50%", background: r.color }} />
                      ))}
                    </div>
                  )}
                  {total > 1 && <div style={{ fontSize: 8, color: "#e040fb", fontWeight: 700, marginTop: 1 }}>×{total}</div>}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {filtered.map(s => {
              const rd = getRarityForSticker(collected, s.id);
              const have = hasAny(collected, s.id);
              const total = totalForSticker(collected, s.id);
              const topRarity = RARITIES.find(r => (rd[r.id] || 0) > 0 && r.id !== "base");
              const borderColor = have ? (topRarity ? topRarity.color : "#22c55e") : "#2a2a4a";
              return (
                <div key={s.id} onClick={() => setModalSticker(s)}
                  style={{ display: "flex", alignItems: "center", gap: 10, background: have ? "#0d1a10" : "#13131f", border: `1px solid ${borderColor}`, borderRadius: 8, padding: "9px 12px", cursor: "pointer" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 7, background: have ? "#0d3020" : "#1e1e35", border: `2px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
                    {have ? (total > 1 ? <span style={{ fontSize: 10, fontWeight: 800, color: "#e040fb" }}>×{total}</span> : "✓") : "○"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 7, alignItems: "baseline" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: have ? "#4ade80" : "#6666aa", flexShrink: 0 }}>{s.id}</span>
                      <span style={{ fontSize: 13, color: have ? "#e8e8f0" : "#8888bb", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
                      {s.foil && <span style={{ fontSize: 9, color: "#d4af37" }}>✦ FOIL</span>}
                      <RarityDots rarityData={rd} />
                    </div>
                  </div>
                  <span style={{ fontSize: 18, color: "#333355", flexShrink: 0 }}>›</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modalSticker && <StickerModal sticker={modalSticker} collectedData={collected} onSave={handleSave} onClose={() => setModalSticker(null)} />}
      <button onClick={() => setScanOpen(true)} style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#7b2ff7,#e040fb)", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", zIndex: 400, boxShadow: "0 4px 20px rgba(224,64,251,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>📷</button>
      {scanOpen && <ScanOverlay onClose={handleScanClose} onAddToInventory={handleScanAdd} onLookUp={handleScanLookUp} />}
      {toast && <ScanToast message={toast.message} color={toast.color} />}
    </div>
  );
}
