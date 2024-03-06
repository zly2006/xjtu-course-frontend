<script lang="ts" setup>

import { useAppStore } from '@/store/app';
import { ref } from 'vue';
import { toast } from 'vuetify-sonner';

const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'purple'];
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

function hashCode(s: string) {
  let hash = 0,
    i, chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
    if (hash < 0) hash = -hash;
  }
  return hash;
}

type Course = {
  name: string
  id: string
  college: string
  collegeId: number
  teachers: string
  startTime: number
  endTime: number
  weeks: string
  weeksDisplay: string
  day: number
  fullDisplay: string
  classroom: string
  xjtuShit_DWDM: string
  xjtuShit_JXBID: string
}
const courses = ref<Course[]>([]);
const selectedCourseId = ref('')

function getSeason(): 'winter' | 'summer' {
  const date = new Date();
  const month = date.getMonth();
  if (month >= 5 && month < 10) {
    return 'summer';
  } else {
    return 'winter';
  }
}

const schedule = {
  winter: ['08:00', '09:00', '10:10', '11:10', '14:00', '15:00', '16:10', '17:10', '19:10', '20:10'],
  summer: ['08:00', '09:00', '10:10', '11:10', '14:30', '15:30', '16:40', '17:40', '19:40', '20:40']
}
/**
 * @returns {string[]} paragraphs
 */
function classDetails(): string[] {
  if (selectedCourseId.value) {
    const course = courses.value.find(c => c.id == selectedCourseId.value);
    if (course) {
      return [
        `课程名称: ${course.name}`,
        `上课时间: ${course.fullDisplay}`,
        `上课地点: ${course.classroom}`,
        `上课老师: ${course.teachers}`,
      ];
    }
  }
  return [];
}
useAppStore().getToken().then(token => {
  fetch('/api/course-schedule', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else if (res.status == 401) {
      useAppStore().removeToken();
      console.log('Token expired, please login again')
      toast('登录token已过期，请重新登录', {
        cardProps: {
          color: 'error'
        }
      })
    } else {
      Promise.reject(res);
    }
  }).then((data: Course[]) => {
    courses.value = data;
  }).catch(err => {
    console.error(err);
  });
});

function filterCourses(day: number, time: number, week?: number) {
  let ret: Course[];
  if (week) {
    ret = courses.value.filter(c => c.day == day && c.startTime <= time && c.endTime >= time && c.weeks[week] == '1');
  } else {
    ret = courses.value.filter(c => c.day == day && c.startTime <= time && c.endTime >= time);
  }
  return ret;
}

function setCourse(id: string, event: Event) {
  selectedCourseId.value = id
  event.stopPropagation()
}
</script>

<template>
  <div @click="selectedCourseId = ''">
    <table>
      <tr>
        <td></td>
        <td
          v-for="day in days"
          :key="day"
          class="header-item"
        >{{ day }}</td>
      </tr>
      <tr
        v-for="time in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :key="time"
      >
        <td>
          {{ time }}
          <span class="mobile-hide">&nbsp;{{ schedule[getSeason()][time - 1] }}</span>
        </td>
        <template v-if="time % 2">
          <td
            v-for="day in [1, 2, 3, 4, 5, 6, 7]"
            :key="day * 100 + time"
            :rowspan="2"
          >
            <div
              v-for="course in filterCourses(day, time)"
              :key="course.id"
            >
              <v-hover>
                <template #default>
                  <v-card
                    class="card"
                    :color="colors[hashCode(course.id) % colors.length]"
                    :class="{ 'inactive': selectedCourseId && selectedCourseId != course.id }"
                    :elevation="course.id == selectedCourseId ? 8 : 2"
                    @mouseenter="setCourse(course.id, $event)"
                    @click="setCourse(course.id, $event)"
                    ripple
                  >
                    <div class="text-center">{{ course.name }}</div>
                    <div class="mobile-hide text-details">{{ course.classroom }}</div>
                  </v-card>
                </template>
              </v-hover>
            </div>
          </td>
        </template>
      </tr>
    </table>
  </div>
  <div @click="selectedCourseId = ''">
    <p v-for="p in classDetails()" :key="p">
      {{ p }}
    </p>
  </div>
</template>
<style scoped>
.card {
  margin: 4px 0;
}
.header-item {
  min-width: 58px;
}
.inactive {
  opacity: 0.5;
  cursor: pointer;
}
.text-details {
  text-align: center;
  font-size: 12px;
}

@media (max-width: 600px) {
  .mobile-hide {
    display: none;
  }
}
</style>
