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
          @click="selectDate(date)"
        >
          <span class="date-content">{{ date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        this.$emit('date-selected', selectedDate);
      }
    },
    resetSelectedDate() {
      const today = new Date();
      if (today.getFullYear() === this.year && today.getMonth() === this.month) {
        this.selectedDate = today.getDate();
      } else {
        this.selectedDate = null;
      }
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
  text-align: center;
  margin-bottom: 20px; 
}
.calendar-date {
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
</style>



<!-- .calendar-weekdays,
.calendar-dates {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px; 
}
.calendar-weekdays div,
.calendar-date {
  width: 14.28%;
  text-align: center;
  margin-bottom: 20px; 
}
.calendar-date {
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
} -->