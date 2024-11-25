import { create } from 'zustand'


const DayStore = create((set) => ({
  dayState:"",
  updateDay: (newDay : string) => set({ dayState : newDay }),
}))

export default DayStore