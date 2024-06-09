import axios from "axios";

export default {
  data() {
    return {
      search: "",
      activeStatusFilter: "all",
      vatStatusFilter: "all",
      headers: [
        { key: "business_id", title: "Business ID" },
        { key: "barangay_id", title: "Barangay ID" },
        { key: "business_name", title: "Business Name" },
        { key: "business_type", title: "Business Type" },
        { key: "monthly_income", title: "Monthly Income" },
        { key: "vat_status", title: "VAT Status" },
        { key: "active_status", title: "Status" },
        { key: "actions", title: "Actions" },
      ],
      businessRecords: [],
      showDetailsDialog: false,
      showEditDialog: false,
      showAddDialog: false,
      adddate_establishmentPicker: false,
      dialogDelete: false,
      selectedBusiness: {},
      newBusiness: {
        business_id: null,
        barangay_id: 0,
        business_name: "",
        business_type: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        middle_initial: "", // Added middle_initial field
        owner_phone_num: "",
        address: "",
        monthly_income: "",
        date_establishment: "",
        tin: "",
        vat_status: "",
        num_employees: "",
        date_registered: "",
        owner_email: "",
        active_status: "",
      },
    };
  },
  computed: {
    filteredBusinessRecords() {
      return this.businessRecords.filter((record) => {
        const matchesActiveStatus =
          this.activeStatusFilter === "all" ||
          (this.activeStatusFilter === "registered" &&
            record.date_registered) ||
          (this.activeStatusFilter === "not_registered" &&
            !record.date_registered) ||
          (this.activeStatusFilter === "active" &&
            record.active_status === "Active") ||
          (this.activeStatusFilter === "inactive" &&
            record.active_status === "Inactive");

        const matchesVatStatus =
          this.vatStatusFilter === "all" ||
          (this.vatStatusFilter === "registered" &&
            record.vat_status === "Registered") ||
          (this.vatStatusFilter === "not_registered" &&
            record.vat_status !== "Registered") ||
          (this.vatStatusFilter === "active" &&
            record.active_status === "Active") ||
          (this.vatStatusFilter === "inactive" &&
            record.active_status === "Inactive");

        const matchesSearch = record.business_name
          .toLowerCase()
          .includes(this.search.toLowerCase());

        return matchesActiveStatus && matchesVatStatus && matchesSearch;
      });
    },
  },

  watch: {
    activeStatusFilter() {
      this.applyFilters();
    },
    vatStatusFilter() {
      this.applyFilters();
    },
    search() {
      this.applyFilters();
    },
  },
  methods: {
    handleRowClick(item) {
      this.selectedBusiness = { ...item };
    },

    editInfo(item) {
      this.newBusiness = { ...item };
    },

    fetchBusinessRecords() {
      axios
        .get("http://localhost/WEBDEV-BMS_ADMIN/bmsDB/data.php")
        .then((response) => {
          if (Array.isArray(response.data)) {
            this.businessRecords = response.data;
            console.log(this.businessRecords); // Log the records to verify data
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    },

    edit(selected) {
      selected.action = "update"; // Add the action property
      axios
        .post("http://localhost/WEBDEV-BMS_ADMIN/bmsDB/crud.php", selected) // Pass the selected object directly
        .then((response) => {
          console.log("Update Response:", response); // Log the response
          if (response.data.success) {
            // Assuming the backend returns a success field
            this.fetchBusinessRecords(); // Refresh business records
          } else {
            console.error("Error updating record:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating record:", error);
        });
    },

    applyFilters() {
      // No need for additional logic here since the computed property already handles the filtering.
      console.log(
        "Filters applied:",
        this.activeStatusFilter,
        this.vatStatusFilter,
        this.search
      );
    },

    removeBusiness(selected) {
      axios
        .post("http://localhost/WEBDEV-BMS_ADMIN/bmsDB/crud.php", {
          action: "delete",
          business_id: selected.business_id,
        })
        .then((response) => {
          console.log("Delete Response:", response); // Log the response
          this.fetchBusinessRecords(); // Refresh business records
        })
        .catch((error) => {
          console.error("Error deleting record:", error);
        });
    },
    
    validateAllFields(business) {
      // Required fields
      const requiredFields = [
        "business_name",
        "business_type",
        "first_name",
        "middle_name",
        "last_name",
        "owner_phone_num",
        "address",
        "monthly_income",
        "date_establishment",
        "tin",
        "num_employees",
        "owner_email",
      ];
    
      // Check if any required field is empty
      const missingFields = requiredFields.filter(
        (field) => !business[field]
      );
    
      if (missingFields.length > 0) {
        console.error("Missing required fields:", missingFields.join(", "));
        alert("Please fill in all required fields.");
        return false;
      }

      // Validate text fields
      const textFields = [
        "business_name",
        "business_type",
        "first_name",
        "middle_name",
        "last_name",
        "address",
      ];
      if (!this.validateTextFields(business, textFields)) {
        alert("Text fields can only contain letters");
        return false;
      }
    
      // Validate email and phone number
      if (!this.validateEmail(business.owner_email)) {
        alert("Please enter a valid email address.");
        return false;
      }
      if (!this.validatePhoneNumber(business.owner_phone_num)) {
        alert("Please enter a valid phone number.");
        return false;
      }
    
      // Ensure monthly income and num_employees are valid numbers
      if (isNaN(business.monthly_income) || isNaN(business.num_employees)) {
        alert("Monthly income and number of employees must be valid numbers.");
        return false;
      }
      
      if (!this.validateTin(business.tin)) {
        alert("TIN number must be exactly 9 digits.");
        return false;
      }

      return true;
    },

    saveAdd() {
      if (!this.validateAllFields(this.newBusiness)) return;
    
      // Increment business ID by 1 based on the length of businessRecords array
      this.newBusiness.business_id = this.businessRecords.length + 1;
    
      // Generate a random barangay ID (assuming it needs to be unique)
      let barangay_id;
      do {
        barangay_id = Math.floor(1000 + Math.random() * 9000);
      } while (
        this.businessRecords.some(
          (record) => record.barangay_id === barangay_id
        )
      );
    
      this.newBusiness.barangay_id = barangay_id;
    
      // Set the date_registered field to the current date without the time
      this.newBusiness.date_registered = new Date();
    
      // Make a POST request to insert the new business record
      axios
        .post("http://localhost/WEBDEV-BMS_ADMIN/bmsDB/crud.php", {
          action: "insert",
          ...this.newBusiness,
        })
        .then((response) => {
          console.log(response);
          // Refresh business records after successful insertion
          this.fetchBusinessRecords();
          // Reset newBusiness object and hide add dialog
          this.resetNewBusiness();
          this.showAddDialog = false;
        })
        .catch((error) => {
          console.error("Error inserting record:", error);
        });
    },

    saveEdit() {
      if (!this.validateAllFields(this.selectedBusiness)) return;

      // Find the index of the edited item in the businessRecords array
      const index = this.businessRecords.findIndex(
        (record) => record.business_id === this.selectedBusiness.business_id
      );

      // Update the item in the array with the edited values
      if (index !== -1) {
        this.businessRecords[index] = { ...this.selectedBusiness };
      }

      // Call the edit method to save changes to the database
      this.edit(this.selectedBusiness);

      // Hide the edit dialog
      this.showEditDialog = false;
    },

    cancelAdd() {
      // Reset the newBusiness object and hide the add dialog
      this.resetNewBusiness();
      this.showAddDialog = false;
    },

    resetNewBusiness() {
      this.newBusiness = {
        business_id: null,
        barangay_id: 0,
        business_name: "",
        business_type: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        middle_initial: "", // Added middle_initial field
        owner_phone_num: "",
        address: "",
        monthly_income: "",
        date_establishment: "",
        tin: "",
        vat_status: "",
        num_employees: "",
        date_registered: "",
        owner_email: "",
        active_status: "",
      };
    },

    addItem() {
      this.resetNewBusiness();
      // Show the add form dialog
      this.showAddDialog = true;
    },

    cancelEdit() {
      // Reset the selected business and close the edit dialog
      this.selectedBusiness = {};
      this.showEditDialog = false;
    },
    editItem(item) {
      // Set selectedBusiness to the item being edited
      this.selectedBusiness = { ...item };

      // Set showEditDialog to true to display the edit dialog
      this.showEditDialog = true;

      console.log("Editing item:", item);
    },

    deleteItem(item) {
      this.selectedBusiness = item;
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.removeBusiness(this.selectedBusiness);
      this.dialogDelete = false;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.selectedBusiness = null;
    },
    showDetails(item) {
      this.selectedBusiness = item;
      this.showDetailsDialog = true;
    },
    closeDetails() {
      this.showDetailsDialog = false;
    },

    getFieldLabel(key) {
      switch (key) {
        case "business_id":
          return "Business ID";
        case "barangay_id":
          return "Barangay ID";
        case "business_name":
          return "Business Name";
        case "business_type":
          return "Business Type";
        case "monthly_income":
          return "Monthly Income";
        case "vat_status":
          return "VAT Status";
        case "active_status":
          return "Status";
        case "first_name":
          return "First Name";
        case "middle_name":
          return "Middle Name";
        case "middle_initial":
          return "Middle Initial"; // Added middle_initial field
        case "last_name":
          return "Last Name";
        case "num_employees":
          return "No. of Employees";
        case "owner_phone_num":
          return "Contact Number";
        case "address":
          return "Address";
        case "date_establishment":
          return "Date Established";
        case "date_registered":
          return "Date Registered";
        case "owner_email":
          return "Email";
        case "tin":
          return "Tin Number";
        default:
          return key; // Use the key as label if not specified
      }
    },

    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailPattern.test(email);
    },

    validatePhoneNumber(phone) {
      const phonePattern = /^(09|\+639|9)\d{8,9}$/; // Modified to accept 9 or 10 digits
      return phonePattern.test(phone);
    },

    validateTextFields(business, fields) {
      for (let field of fields) {
        let pattern;
        if (field === "business_name") {
          pattern = /^[a-zA-Z0-9\s'-]+$/; // Allow letters, numbers, spaces, hyphens, and apostrophes for business_name
        } else if (field === "address") {
          pattern = /^[a-zA-Z0-9\s,.-]+$/; // Allow letters, numbers, spaces, commas, hyphens, and periods for address
        } else {
          pattern = /^[a-zA-Z\s'-]+$/; // Allow only letters, spaces, hyphens, and apostrophes for other text fields
        }
        if (!pattern.test(business[field])) {
          console.error(`Invalid text in field ${field}:`, business[field]);
          return false;
        }
      }
      return true;
    },

    validateTin(tin) {
      const tinPattern = /^\d{9}$/;
      return tinPattern.test(tin);
    }
  },
  created() {
    // Fetch business records from the backend when the component is created
    this.fetchBusinessRecords();
  },
};
