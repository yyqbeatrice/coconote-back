<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="previousMonth">&lt;</button>
      <span>{{ year }} {{ monthName }}</span>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="calendar-body">
      <div class="calendar-weekdays">
        <div v-for="weekday in weekdays" :key="weekday">{{ weekday }}</div>
      </div>
      <div class="calendar-dates">
        <div
          v-for="date in paddedDates"
          :key="date"
          class="calendar-date"
          :class="{ selected: date === selectedDate }"
          @click="selectDate(date)">
          <span class="date-content">{{ date }}</span>
          <div v-if="hasMyDDL(date)" class="calendar-todo calendar-todo-me"></div>
          <div v-else-if="hasOtherDDL(date)" class="calendar-todo calendar-todo-other"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selfDDL: null,
    othersDDL: null
    
  },
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
    };
  },
  computed: {
    year() {
      return this.currentDate.getFullYear();
    },
    month() {
      return this.currentDate.getMonth();
    },
    monthName() {
      return this.months[this.month];
    },
    daysInMonth() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    firstDayOfMonth() {
      return new Date(this.year, this.month, 1).getDay();
    },
    paddedDates() {
      const days = [];
      for (let i = 0; i < this.firstDayOfMonth; i++) {
        days.push('');
      }
      for (let i = 1; i <= this.daysInMonth; i++) {
        days.push(i);
      }
      return days;
    },
  },
  methods: {
    previousMonth() {
      const month = this.currentDate.getMonth();
      this.currentDate.setMonth(month - 1);
      this.currentDate = new Date(this.currentDate); // 触发响应式更新
      this.resetSelectedDate();
    },
    nextMonth() {
      const month = this.currentDate.getMonth();
      this.currentDate.setMonth(month + 1);
      this.currentDate = new Date(this.currentDate); // 触发响应式更新
      this.resetSelectedDate();
    },
    selectDate(date) {
      if (date) {
        this.selectedDate = date;
        const selectedDate = new Date(this.year, this.month, date);
        let paddedMonth = this.month+1;
        paddedMonth = paddedMonth.toString().padStart(2, '0');
        let paddedDate = date.toString().padStart(2, '0');
        const dateStr = this.year + '-' + paddedMonth + '-' + paddedDate;
        const params = {
          dateStr: dateStr,
          date: date,
          weekday: this.weekdays[selectedDate.getDay()],
          month: this.months[this.month],
          hasMyDDL: this.hasMyDDL(date),
          hasOtherDDL: this.hasOtherDDL(date)
        }
        this.$emit('date-selected', params);
      }
    },
    resetSelectedDate() {
      const today = new Date();
      if (today.getFullYear() === this.year && today.getMonth() === this.month) {
        this.selectedDate = today.getDate();
      } else {
        this.selectedDate = null;
      }
    },
    hasMyDDL(date){
      console.log(this.year, this.month+1, date);
      let paddedMonth = this.month+1;
      paddedMonth = paddedMonth.toString().padStart(2, '0');
      const dateStr = this.year + '-' + paddedMonth + '-' + date;
      return this.selfDDL.includes(dateStr);
    },
    hasOtherDDL(date){
      console.log(this.year, this.month+1, date)
      let paddedMonth = this.month+1;
      paddedMonth = paddedMonth.toString().padStart(2, '0');
      const dateStr = this.year + '-' + paddedMonth + '-' + date;
      return this.othersDDL.includes(dateStr);
    }
  },
  mounted() {
    this.resetSelectedDate();
  },
};
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 20px; 
}
.calendar-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
}
.calendar-weekdays,
.calendar-dates {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px; 
}
.calendar-weekdays div,
.calendar-date {
  width: 14.28%;
  height: 16.67%;
  text-align: center;
  /* margin-bottom: 20px;  */
  /* background-color: aqua; */

  cursor: pointer;
  margin-bottom: 40px; 
  position: relative;
}
.date-content {
  position: relative;
  z-index: 1;
}
.calendar-date.selected::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background-color: #C3E85A;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
} 

.calendar-todo {
  width: 8px;
  height: 8px;
  border-radius: 10px;
  
  position: absolute;
  left: 50%;
  top: 130%;
  transform: translate(-50%, 0);
}

.calendar-todo.calendar-todo-me{
  background-color: #60B71C;
}

.calendar-todo.calendar-todo-other{
  background-color: #BFBFBF;
}

.calendar-header button {
  border: none;
  background: none;
  cursor: pointer;
}

</style>