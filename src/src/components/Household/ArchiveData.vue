<template>
  <div>
    <h1 class="title">Archive Records</h1>
    <v-card class="archive-card">
      <v-card-text>
        <!-- Year Selector -->
        <v-select v-model="selectedYear" :items="years" label="Select Year"></v-select>
        
        <!-- Table Sorting -->
        <v-btn @click="toggleSortDirection" color="primary" class="sort-btn">Toggle Sort Order</v-btn>
        
        <!-- Activity Table -->
        <table class="activity-table">
          <thead>
            <tr>
              <th @click="sortBy('date')" class="sortable-header">Date & Time</th>
              <th>Status</th>
              <th>Details</th>
              <th>User</th> 
              <th>Related Documents</th>
              <th v-if="showRestoreButton">Action</th>
                
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in sortedActivities" :key="activity.id" :class="{ 'even-row': $index % 2 === 0, 'odd-row': $index % 2 !== 0 }">
              <td>{{ formatDate(activity.date) }}</td>
              <td>{{ activity.action }}</td>
              <td>{{ activity.details }}</td>
              <td>{{ activity.additionalInfo }}</td>
              <td>{{ formatDocuments(activity.documents) }}</td>
              <td v-if="activity.action === 'Deleted'">
                <v-btn @click="confirmRestore(activity)" color="red lighten-1" small class="restore-btn">
                  <v-icon>mdi-restore</v-icon>
                
                </v-btn>
              </td>
              <td v-if="showCustomButton">
                <v-btn color="blue" small class="custom-btn">Custom</v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
    </v-card>
  </div>
</template>



<script>
export default {
  data() {
    return {
      selectedYear: new Date().getFullYear(), // Default to current year
      activities: [
        { id: 1, date: '2023-01-01', action: 'Edited', details: 'Entry #123 updated', additionalInfo: 'Admin', documents: ['DocumentA'] },
        { id: 2, date: '2023-02-15', action: 'Added', details: 'New entry #456 created', additionalInfo: 'UserA', documents: ['DocumentB'] },
        { id: 3, date: '2023-03-10', action: 'Deleted', details: 'Entry #789 deleted', additionalInfo: 'UserB', documents: ['DocumentC'] },
        // Add more dummy sample data as needed
      ],
      sortDirection: 'asc' // Initial sort direction
    };
  },
  computed: {
    // Filter and sort activities by selected year
    sortedActivities() {
      const filteredActivities = this.activities.filter(activity => {
        return new Date(activity.date).getFullYear() === this.selectedYear;
      });
      // Sort by date
      const sorted = filteredActivities.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (this.sortDirection === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
      return sorted;
    },
    // Get unique years from activities for the year selector
    years() {
      const yearsSet = new Set(this.activities.map(activity => {
        return new Date(activity.date).getFullYear();
      }));
      return Array.from(yearsSet);
    },
    // Check if any activity is deleted to show Restore button
    showRestoreButton() {
      return this.activities.some(activity => activity.action === 'Deleted');
    }
  },
  methods: {
    // Toggle sort direction
    toggleSortDirection() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    },
    // Sort activities by a specific field
    sortBy(field) {
      if (field === 'date') {
        this.toggleSortDirection();
      }
    },
    // Confirm document restore
    confirmRestore(activity) {
      if (confirm("Are you sure you want to restore this record?")) {
        this.restoreDocument(activity);
      }
    },
    // Restore document
    restoreDocument(activity) {
      // Logic to restore document goes here
      console.log("Document restored:", activity.documents);
    },
    // Format date to a readable format
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    // Format documents list
    formatDocuments(documents) {
      return documents.join(', ');
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.archive-card {
  padding: 20px;
}

.activity-table {
  width: 100%;
  border-collapse: collapse;
}

.sortable-header {
  cursor: pointer;
}

th, td {
  border-top: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.even-row
{
  background-color: #f9f9f9;
}

.restore-btn {
  text-transform: uppercase;
}

.restore-btn:hover {
  background-color: #f9f9f9;  /* Lighten red for hover effect */
  color: #ffffff; /* Change text color on hover */
}

.sort-btn {
  margin-bottom: 10px;
}

.sort-btn:hover {
  background-color:#f9f9f9; /* Lighten primary color for hover effect */
}
</style>
