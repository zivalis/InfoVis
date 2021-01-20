import csv
import numpy as np
import zzzinzidenzarray

csvdatei = open("data/Covid.csv")
csv_reader_object = csv.reader(csvdatei)

def ids():
    data_table = []
    with open("data/ids_names.csv") as ids:
        ids = csv.reader(ids, delimiter=';')

        index = 0
        for row in ids:
            #Kreis/Kreisfreie Stadt rausnehmen
            id = row[0]
            name = row[1].split(',')
            name = name[0]
            name = name.replace('Ã¤', 'ä')
            name = name.replace('Ã¼', 'ü')
            name = name.replace('Ã¶', 'ö')
            name = name.replace('ÃŸ', 'ß')

            #Zeilenweise ins Array schreiben
            row = [id, name]
            data_table.append(row)
    return data_table

def altersstruktur(data_table):
    with open('data/Altersstruktur 2018 Kreisebene 12411-02-03-5-B.csv') as altersstruktur_csv:
        data = csv.reader(altersstruktur_csv, delimiter=';')
        alter_array = []
        index = 0
        position = 0
        for row in data:
            if index < 9:
                index += 1
            elif(index > 497):
                continue
            else:
                try:
                    a_15 = 0
                    a_15_35 = 0
                    a_35_60 = 0
                    a_60_plus = 0
                    a_gesamt = 0
                    a_15 = int(row[2]) + int(row[3]) + int(row[4]) + int(row[5])
                    a_15_35 = int(row[6]) + int(row[7]) + int(row[8]) + int(row[9]) + int(row[10])
                    a_35_60 = int(row[11]) + int(row[12]) + int(row[13]) + int(row[14]) + int(row[15])
                    a_60_plus = int(row[16]) + int(row[17]) + int(row[18])
                    a_gesamt = int(row[19])
                    a_15 = a_15 / a_gesamt
                    a_15_35 = a_15_35 / a_gesamt
                    a_35_60 = a_35_60 / a_gesamt
                    a_60_plus = a_60_plus / a_gesamt
                    array_alter_kreis = [a_gesamt, a_15, a_15_35, a_35_60, a_60_plus]
                except(ValueError):
                    array_alter_kreis = [a_gesamt, a_15, a_15_35, a_35_60, a_60_plus]
                data_table[position].append(array_alter_kreis)
                position += 1
                index += 1
    return data_table

def initBLUndDE():
    result = []
    result += [['0', 'Deutschland',[83019213, 0.136002434, 0.231429717, 0.350977056, 0.281590793]]]
    result += [['1', 'Schleswig-Holstein']]
    result += [['2', 'Hamburg']]
    result += [['3', 'Niedersachsen']]
    result += [['4', 'Bremen']]
    result += [['5', 'Nordrhein-Westfalen']]
    result += [['6', 'Hessen']]
    result += [['7', 'Rheinland-Pfalz']]
    result += [['8', 'Baden-Württemberg']]
    result += [['9', 'Bayern']]
    result += [['10', 'Saarland']]
    result += [['11', 'Berlin']]
    result += [['12', 'Brandenburg']]
    result += [['13', 'Mecklenburg-Vorpommern']]
    result += [['14', 'Sachsen']]
    result += [['15', 'Sachsen-Anhalt']]
    result += [['16', 'Thüringen']]

    with open('data/Altersstruktur 2018 Länderebene 12411-02-03-5-B.csv') as altersstruktur_csv:
        data = csv.reader(altersstruktur_csv, delimiter=';')
        alter_array = []
        index = 0
        position = 1
        for row in data:
            if index < 9:
                index += 1
            elif(index > 24):
                continue
            else:
                try:
                    a_15 = 0
                    a_15_35 = 0
                    a_35_60 = 0
                    a_60_plus = 0
                    a_gesamt = 0
                    a_15 = int(row[2]) + int(row[3]) + int(row[4]) + int(row[5])
                    a_15_35 = int(row[6]) + int(row[7]) + int(row[8]) + int(row[9]) + int(row[10])
                    a_35_60 = int(row[11]) + int(row[12]) + int(row[13]) + int(row[14]) + int(row[15])
                    a_60_plus = int(row[16]) + int(row[17]) + int(row[18])
                    a_gesamt = int(row[19])
                    a_15 = a_15 / a_gesamt
                    a_15_35 = a_15_35 / a_gesamt
                    a_35_60 = a_35_60 / a_gesamt
                    a_60_plus = a_60_plus / a_gesamt
                    array_alter_kreis = [a_gesamt, a_15, a_15_35, a_35_60, a_60_plus]
                except(ValueError):
                    array_alter_kreis = [1,1,1,1,1]
                result[position].append(array_alter_kreis)
                position += 1
                index += 1

    test = 0
    return result

def insertRAWFaelle(raw_table):
    id_indizes = []
    test = len(raw_table)
    for i in range(len(raw_table)):
        id_indizes.append([int(raw_table[i][0]), i]) #Tabelle mit LK Ids, und der jeweilige Inde in der RAW Tabelle

    unbekannteAltersFaelle = 0
    csvdatei = open("data/Covid.csv")
    csv_reader_object = csv.reader(csvdatei, delimiter = ",")
    zeilennummer = 0
    for row in csv_reader_object:
        date = row[13]
        if(date[0:4] == "2021"): #Uns interessiert nur 2020
            x = 0
        elif zeilennummer == 0: #Headerzeile
            x = 0
        else:
            def meldedatum():
                tage_add_monat = [0,0,31,60,91,121,152,182,213,244,274,305,335,366]
                meldedatum = date
                meldedatum_month = int(meldedatum[5:7])
                meldedatum_day =  int(meldedatum[8:10])
                meldedatum_index = tage_add_monat[meldedatum_month] + meldedatum_day - 1
                return meldedatum_index
            meldedatum = meldedatum() # index des Datums ( 1. Januar = 0; 1. Feburuar = 31; ...)
            anzahl = int(row[6])
            altersgruppe = row[4]
            lk = int(row[9])
            bl = int(row[1])

            def idFromLK(lk):
                id_indizes_2 = id_indizes[300:]
                for i in id_indizes:
                    if i[0] == lk:
                        return i[1]

                #Berlin
                if(lk == 11001): return 348
                if(lk == 11002): return 348
                if(lk == 11003): return 348
                if(lk == 11004): return 348
                if(lk == 11005): return 348
                if(lk == 11006): return 348
                if(lk == 11007): return 348
                if(lk == 11008): return 348
                if(lk == 11009): return 348
                if(lk == 11010): return 348
                if(lk == 11011): return 348
                if(lk == 11012): return 348
                return 999
            
            lk_id = idFromLK(lk) #Wenn 999, dann darf es nicht weiter verwendet werden
            if(lk_id == 999): 
                print("ID " + str(lk) + " konnte nicht zugeordnet werden!")
                #TODO Auswerten, es darf hier nie soweit kommen, sollte einen Error werfen

            #Gesamtanzahlen erhöhen
            #Deutschland
            raw_table[0][3][meldedatum][0] += anzahl
            #Bundesland
            raw_table[bl][3][meldedatum][0] += anzahl
            #Landkreis
            if(lk_id != 999):
                raw_table[lk_id][3][meldedatum][0] += anzahl

            #Wenn Alter codiert ist, auch jeweiliges Alter erhöhen
            if(altersgruppe == "unbekannt"):
                unbekannteAltersFaelle += 1
            else:
                if(altersgruppe == 'A00-A04' or altersgruppe == 'A05-A14'):
                    #Deutschland
                    raw_table[0][3][meldedatum][1] += anzahl
                    #Bundesland
                    raw_table[bl][3][meldedatum][1] += anzahl
                    #Landkreis
                    if(lk_id != 999):
                        raw_table[lk_id][3][meldedatum][1] +=anzahl
                elif(altersgruppe == "A15-A34"):
                    #Deutschland
                    raw_table[0][3][meldedatum][2] += anzahl
                    #Bundesland
                    raw_table[bl][3][meldedatum][2] += anzahl
                    #Landkreis
                    if(lk_id != 999):
                        raw_table[lk_id][3][meldedatum][2] += anzahl
                elif(altersgruppe == "A35-A59"):
                    #Deutschland
                    raw_table[0][3][meldedatum][3] += anzahl
                    #Bundesland
                    raw_table[bl][3][meldedatum][3] += anzahl
                    #Landkreis
                    if(lk_id != 999):
                        raw_table[lk_id][3][meldedatum][3] += anzahl
                elif(altersgruppe == "A60-A79" or altersgruppe == 'A80+'):
                    #Deutschland
                    raw_table[0][3][meldedatum][4] += anzahl
                    #Bundesland
                    raw_table[bl][3][meldedatum][4] += anzahl
                    #Landkreis
                    if(lk_id != 999):
                        raw_table[lk_id][3][meldedatum][4] += anzahl
                
        zeilennummer += 1
        if((zeilennummer % 10000) == 0):
            print ("Zeile " + str(zeilennummer) + " abgearbeitet.")
    x = "test"
    return raw_table

def prozenteausAltersgruppen(raw_table, data_table):
    stelle = 0
    for lk in raw_table:
        for day in range(366):
            a = [0,0,0,0,0]
            for alter in range(5):                
                min_7_day = min(7, (day + 1))
                for i in range(min_7_day):
                    a[alter] += lk[3][day - i][alter]
            for alter in range(4):
                alter += 1
                try:
                    data_table[stelle][3][day][alter] = a[alter] / a[0]
                except:
                    data_table[stelle][3][day][alter] = 0
        stelle += 1
    return data_table
    print("Altersgruppen geschrieben")

def inzidenz(raw_table, data_table):
    stelle = 0
    for lk in raw_table:
        ew_zahl = int(lk[2][0])
        for day in range(366):
            allefaelle = 0
            min_7_day = min(7, (day + 1))
            for i in range(min_7_day):
                allefaelle += lk[3][day - i][0]
            try:
                inzidenz = allefaelle / (ew_zahl / 100000)
            except:
                inzidenz = 0
            a = 0
            data_table[stelle][3][day][0] = inzidenz
        stelle += 1
    return data_table
    print("Inzidenzen geschrieben")

def main():
    unbekanntefaelle = 0
    id_table = ids()
    raw_table = altersstruktur(id_table)
    raw_table[0][0] = '1001' #wieso auch immer ist der erste Wert sonst kryptisch

    blUndDE = initBLUndDE()
    raw_table = blUndDE + raw_table
    for i in range(506):#489 Landkreise, 16 BL und DE
        #raw_data mit leeren Arrays vorinitialisieren
        raw_table[i].append([[0,0,0,0,0]])
        for j in range(365):
            raw_table[i][3].append([0,0,0,0,0])

    raw_table = insertRAWFaelle(raw_table)
    data_table = zzzinzidenzarray.givearray()

    #data_table = raw_table.copy()

    data_table = inzidenz(raw_table, data_table)
    data_table = prozenteausAltersgruppen(raw_table, data_table)
    data_table_2 = data_table[300:]

    with open("data/testmitlinebreaks_7days.txt", "w") as file:
        for line in data_table:
            file.write(str(line))
            file.write("\n")
    with open("data/inzidenzen.txt", "w") as file:
        file.write(str(data_table))
    print("Datei schreiben abgeschlossen!")

main()