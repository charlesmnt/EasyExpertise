import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";
//import testIDs from '../testIDs';

import { LocaleConfig } from "react-native-calendars";

// COMPOSANT A OPTIMISER (SEB 09/03)

// --- ERREUR SIGNALÉE A L'OUVERTURE DU CALENDRIER ---
// VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. Object {
//     "contentLength": 36360,
//     "dt": 526,
//     "prevDt": 3541,
//   }


//------ Débu Code localization -----
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";
//------ Fin code localization -----

//----------Code collé ci-dessous depuis : https://github.com/wix/react-native-calendars/blob/master/example/src/screens/agenda.tsx
//Réécrire la syntaxe de déclaration pour résoudre les erreurs signalées
//---------------Erreur à ignorer pour le moment : State (SEB)----------
interface State {
  items?: AgendaSchedule;
}

//---- Défintion des clé et couleurs pour les points sur le calendrier ---
const todo = { key: "todo", color: "#A3CB38", selectedDotColor: "#A3CB38" };
const important = { key: "important", color: "#F79F1F", selectedDotColor: "#F79F1F" };
const urgent = { key: "urgent", color: "#ED4C67", selectedDotColor: "#ED4C67" };
//----- Fin définition des clés et couleurs pour les points

//---------------Erreur à ignorer pour le moment : State (SEB)----------
export default class HomeAgenda extends Component<State> {
  state: State = {
    items: undefined,
  };

//export default HomeAgenda = () => {
//
//  

  render() {
    return (
      <Agenda
        //testID={testIDs.agenda.CONTAINER}
        //items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={new Date()}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}

        // ---------- Ajout de marker sur les dates personnalisées ---------
        //EXEMPLE DE FORMAT
        // {
        //  dateString : [{dots: [todo,important, urgent]},
        //  dateString : [{dots: [urgent, urgent, todo]},
        // }

        markingType={"multi-dot"}
        markedDates={{
          "2022-03-10": { dots: [todo, important, urgent] },
          "2022-03-11": { dots: [todo] },

          "2022-03-15": { dots: [important, todo] },
          "2022-03-16": { dots: [urgent] },
          "2022-03-17": { dots: [important, todo] }
        }}
        // ---------- Fin ajout de markers sur les dates -------------

        // ---------- Ajout des items personnalisées -----------------
        //EXEMPLE DE FORMAT
        // {
        //  dateString : [{name: 'any js object'}, {name: ''}],
        //  dateString : [{name: ''}, {name: ''}],
        // }

        items={{
            // "2022-03-08": [],
            // "2022-03-09": [{name: 'Dernier Point Sprint', height: 80}],
            // "2022-03-10": [{name: "Finalisation de l'appli"},{name: "Test de l'appli"},{name: 'Préparation pour le DemoDay'}],
            "2022-03-11": [{name: '10h00 M.LAMI'}, {name: '11H30 Me.MICHU'}, {name: '14H30 M.ANTOINE'}, {name: '16H00 M.JUPITER'}],
            // "2022-03-15": [{name: '10h15 : RDV M. Idram'}, {name: 'Expertise DFG08'}],
            // "2022-03-16": [{name: 'Expertise ESDY-980'}],
            // "2022-03-17": [{name: 'Expertise XYZ-FD45'}, {name: '15h30 : RDV Mme. Deuji'}]
          }}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
        //   function loadItemsForMonth={month => {
        //     console.log('trigger items loading');
        //   }}
        
        // ---------- Fin des items personnalisées -----------------


        // markingType={'period'}
        // markedDates={{
        //    '2022-03-08': {textColor: '#43515c'},
        //    '2022-03-09': {textColor: '#43515c'},
        //    '2022-03-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2022-03-21': {startingDay: true, color: 'blue'},
        //    '2022-03-22': {endingDay: true, color: 'gray'},
        //    '2022-03-24': {startingDay: true, color: 'gray'},
        //    '2022-03-25': {color: 'gray'},
        //    '2022-03-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
        showOnlySelectedDayItems

        // Specify theme properties to override specific styles for calendar parts. Default = {}


        //----------AJOUT DU THEME DE MISE EN FORME --------------------

        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
          // Do not show days of other months in month page. Default = false
        hideExtraDays={false}
        

        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#1B1464",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#1289A7",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#1289A7",
          dayTextColor: "#1B1464",
          textDisabledColor: "#d9e1e8",
          dotColor: "#A3CB38",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "#1289A7",
          indicatorColor: "#1289A7",
          // textDayFontFamily: 'monospace',
          // textMonthFontFamily: 'monospace',
          // textDayHeaderFontFamily: 'monospace',
          // textDayFontWeight: '300',
          // textMonthFontWeight: 'bold',
          // textDayHeaderFontWeight: '300',
          // textDayFontSize: 16,
          // textMonthFontSize: 16,
          // textDayHeaderFontSize: 16
          agendaDayTextColor: "#ccc",
          agendaDayNumColor: "#ccc",
          agendaTodayColor: "#1289A7",
          agendaKnobColor: "#ccc",
        }}
      />
    );
  }
//------ Génération automatique d'item de remplissages -----------

//   loadItems = (day: DateData) => {
//     const items = this.state.items || {};

//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);

//         if (!items[strTime]) {
//           items[strTime] = [];

//           const numItems = Math.floor(Math.random() * 3 + 1);
//           for (let j = 0; j < numItems; j++) {
//             items[strTime].push({
//               name: "RDV du " + strTime + " #" + j,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//               day: strTime,
//             });
//           }
//         }
//       }

//       const newItems: AgendaSchedule = {};
//       Object.keys(items).forEach((key) => {
//         newItems[key] = items[key];
//       });
//       this.setState({
//         items: newItems,
//       });
//     }, 1000);
//   };
// ------ Fin génération automatique des item------
//--------------------------Erreur à ignorer pour le moment : AgendaEntry et  isFirst: boolean (SEB)----------
  renderItem = (reservation: AgendaEntry, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "#1B1464" : "#ccc";

    return (
      <TouchableOpacity
        //testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };
//--------------------------Erreur à ignorer pour le moment : AgendaEntry (SEB)----------
//   rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
//     return r1.name !== r2.name;
//   };
//--------------------------Erreur à ignorer pour le moment : number (SEB)----------
//   timeToString(time: number) {
//     const date = new Date(time);
//     return date.toISOString().split("T")[0];
//   }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 0.5,
    paddingTop: 30,
  },
});
