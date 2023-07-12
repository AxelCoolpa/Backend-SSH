import moment from "moment";
export default function filterOfTime(
   startDate: string,
   endDate: string,
   arrayEvente: any
) {
   const momentStart = moment(startDate).subtract(1, "day");
   const momentEnd = moment(endDate).add(1, "day");

   const EventeFiltered = arrayEvente.filter((event: any) => {
      const startTimeTemp: any = event.startTime;
      const endTimeTemp: any = event.endTime;

      const activitiesInRangeStart = startTimeTemp.some(
        (date: Date) => {
           return moment(date.toISOString()).isBetween(
              momentStart,
              momentEnd
           );
        }
     );
     const activitiesInRangeEnd = endTimeTemp.some((date: Date) => {
        return moment(date.toISOString()).isBetween(
           momentStart,
           momentEnd
        );
     });

     return activitiesInRangeStart && activitiesInRangeEnd;
      
   });

   return EventeFiltered;
}
