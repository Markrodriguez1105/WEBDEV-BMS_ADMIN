import axios from "axios";

export default {
  data() {
    return {
      search: "",
      activeStatusFilter: "all",
      vatStatusFilter: "all",
      businessHeaders: [
        { key: "business_id", title: "Business ID" },
        { key: "business_name", title: "Business Name" },
        { key: "business_type", title: "Business Type" },
        { key: "monthly_income", title: "Monthly Income" },
        { key: "vat_status", title: "VAT Status" },
        { key: "active_status", title: "Status" },
        { key: "actions", title: "Actions" },
      ],
      showDeleteClearanceDialogs: false,
      showClearanceDetailsDialogs: false,
      showEditClearanceDialogs: false,
      dialog: false,
      formDialog: false,
      search2: "",
      clearanceHeaders: [
        { title: "Clearance ID", key: "clearance_id" },
        { title: "Business Name", key: "clearance_name" },
        { title: "Owner Name", key: "clearance_owner_name" },
        { title: "TIN", key: "clearance_tin" },
        { title: "Date Issued", key: "date_issued" },
        { title: "Actions", key: "actions", sortable: false },
      ],
      clearances: [],

      filteredClearances: [],
      form: {
        clearance_id: "",
        clearance_name: "",
        clearance_owner_name: "",
        clearance_tin: "",
        date_issued: new Date().toISOString().substr(0, 10), // Set current date
      },
      firstNameRules: [
        (value) => !!value || "First name is required.",
        (value) => !/\d/.test(value) || "First name cannot contain digits.",
      ],
      middleNameRules: [
        (value) => !!value || "Middle name is required.",
        (value) => !/\d/.test(value) || "Middle name cannot contain digits.",
      ],
      lastNameRules: [
        (value) => !!value || "Last name is required.",
        (value) => !/\d/.test(value) || "Last name cannot contain digits.",
      ],
      phoneRules: [
        (value) => !!value || "Contact number is required.",
        (value) =>
          /^(0|9)\d{9,10}$/.test(value) ||
          "Contact number must be 10 or 11 digits and start with 0 or 9.",
      ],
      emailRules: [
        (value) => !!value || "Email is required.",
        (value) => /.+@.+\..+/.test(value) || "Email must be valid.",
      ],
      businessNameRules: [(value) => !!value || "Business name is required."],
      businessTypeRules: [
        (value) => !!value || "Business type is required.",
        (value) =>
          /^[A-Za-z\s]+$/.test(value) ||
          "Business type must contain only letters",
      ],
      incomeRules: [
        (value) => !!value || "Monthly income is required.",
        (value) =>
          /^\d+(\.\d{1,2})?$/.test(value) ||
          "Monthly income must be a valid number.",
      ],
      vatStatusRules: [(value) => !!value || "VAT status is required."],
      activeStatusRules: [(value) => !!value || "Active status is required."],
      addressRules: [(value) => !!value || "Address is required."],
      employeesRules: [
        (value) => !!value || "Number of employees is required.",
        (value) =>
          /^\d+$/.test(value) || "Number of employees must be a valid number.",
      ],
      dateRules: [
        (value) => !!value || "Date established is required.",
        (value) => {
          const today = new Date();
          const selectedDate = new Date(value);
          return (
            selectedDate <= today || "Date established cannot be in the future."
          );
        },
      ],
      tinRules: [
        (value) => !!value || "TIN number is required.",
        (value) =>
          /^\d{9}$|^(\d{3}[-\s]\d{3}[-\s]\d{3})$/.test(value) ||
          "TIN number must be 9 digits.",
      ],
      incomeRanges: [
        { label: "Below ₱10,000", value: "Below ₱10,000" },
        { label: "₱10,000 - ₱50,000", value: "₱10,000 - ₱50,000" },
        { label: "₱50,000 - ₱100,000", value: "₱50,000 - ₱100,000" },
        { label: "Above ₱100,000", value: "Above ₱100,000" },
      ],
      incomeRules: [(value) => !!value || "Monthly income range is required."],

      businessRecords: [],

      showAddDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      showDetailsDialog: false,
      dialogDelete: false,
      selectedClearance: {},
      selectedBusiness: {},
      newBusiness: {
        business_id: null,
        business_name: "",
        business_type: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        owner_phone_num: "",
        address: "",
        date_establishment: "",
        tin: "",
        monthly_income: "",
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
    "form.clearance_name": function (newVal) {
      this.updateClearanceDetails();
    },
    showDeleteClearanceDialogs(val) {
      console.log("showDeleteClearanceDialogs changed:", val);
    },
    showClearanceDetailsDialogs(val) {
      console.log("showClearanceDetailsDialogs changed:", val);
    },
    showEditClearanceDialogs(val) {
      console.log("showEditClearanceDialogs changed:", val);
    },
    vatStatusFilter() {
      this.applyFilters();
    },
    search() {
      this.applyFilters();
    },
  },
  formTitle() {
    return this.form.clearance_id ? "Edit Clearance" : "New Clearance";
  },
  methods: {
    fetchClearances() {
      axios
        .get("http://localhost/bms/bmsDB/clearanceData.php")
        .then((response) => {
          this.clearances = response.data;
          this.filteredClearances = this.clearances;
        })
        .catch((error) => {
          console.error("Error fetching clearances:", error);
        });
    },

    saveClearance() {
      const action = this.form.clearance_id ? "update" : "insert";
      axios
        .post("http://localhost/bms/bmsDB/clearanceCRUD.php", {
          action,
          ...this.form,
        })
        .then((response) => {
          this.fetchClearances(); // Refresh the list after saving
          this.closeForm();
        })
        .catch((error) => {
          console.error("Error saving clearance:", error);
        });
    },
    closeForm() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    openClearance(clearance = {}) {
      this.form = { ...clearance };
      this.formDialog = true;
    },
    closeForm() {
      this.formDialog = false;
      this.$refs.form.reset();
    },
    filterClearances() {
      const searchLower = this.search2.toLowerCase();
      this.filteredClearances = this.clearances.filter((clearance) =>
        Object.values(clearance).some((value) =>
          value.toString().toLowerCase().includes(searchLower)
        )
      );
    },
    printTable() {
      window.print();
    },
    getFieldLabel(key) {
      switch (key) {
        case "clearance_id":
          return "Clearance ID";
        case "clearance_name":
          return "Business Name";
        case "clearance_owner_name":
          return "Owner Name";
        case "clearance_tin":
          return "TIN";
        case "date_issued":
          return "Date Issued";
        default:
          return key; // Use the key as label if not specified
      }
    },

    handleRowClick(item) {
      this.selectedBusiness = { ...item };
    },

    editInfo(item) {
      this.newBusiness = { ...item };
    },

    fetchBusinessRecords() {
      axios
        .get("http://localhost/bms/bmsDB/data.php")
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
      // Add the action property to the selected object
      selected.action = "update";

      // Make a POST request to update the selected business record
      axios
        .post("http://localhost/bms/bmsDB/crud.php", selected)
        .then((response) => {
          console.log("Update Response:", response);

          // Assuming your backend returns a success field
          if (response.data.success) {
            // Refresh business records after successful update
            this.fetchBusinessRecords();

            // Optionally, you can reset selectedBusiness and hide edit dialog here
            this.selectedBusiness = {};
            this.showEditDialog = false;
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
        .post("http://localhost/bms/bmsDB/crud.php", {
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
      const missingFields = requiredFields.filter((field) => !business[field]);

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

      if (!business.monthly_income) {
        alert("Please select a monthly income range.");
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

      // Validate email and phone number
      if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
          business.owner_email
        )
      ) {
        alert("Please enter a valid email address.");
        return false;
      }

      if (!this.validateTin(business.tin)) {
        alert("TIN number must be exactly 9 digits.");
        return false;
      }

      return true;
    },

    saveAdd() {
      // Validate all fields
      if (!this.validateAllFields(this.newBusiness)) {
        return; // Stop execution if validation fails
      }

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

      // Set the date_registered field to the current date and time
      this.newBusiness.date_registered = new Date().toISOString();

      // Make a POST request to insert the new business record
      axios
        .post("http://localhost/bms/bmsDB/crud.php", {
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
        business_name: "",
        business_type: "",
        first_name: "",
        middle_name: "",
        last_name: "",
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

    openClearance() {
      // Show the add form dialog
      this.formDialog = true;
    },

    editClearance(item) {
      if (item && item.clearance_id) {
        console.log("Edit clicked", item);
        this.selectedClearance = { ...item };
        this.showEditClearanceDialogs = true;
        console.log("Edit dialog state:", this.showEditClearanceDialogs);
      } else {
        console.error("Invalid item for editing:", item);
      }
    },

    deleteClearance(item) {
      if (item && item.clearance_id) {
        console.log("Delete clicked", item);
        this.selectedClearance = { ...item };
        this.showDeleteClearanceDialogs = true;
        console.log("Delete dialog state:", this.showDeleteClearanceDialogs);
      } else {
        console.error("Invalid item for deletion:", item);
      }
    },

    showClearanceDetails(item) {
      if (item && item.clearance_id) {
        console.log("Details clicked", item);
        this.selectedClearance = { ...item };
        this.showClearanceDetailsDialogs = true;
        console.log("Details dialog state:", this.showClearanceDetailsDialogs);
      } else {
        console.error("Invalid item for details:", item);
      }
    },

    updateClearanceDetails() {
      console.log(
        "updateClearanceDetails called with clearance_name:",
        this.form.clearance_name
      );
      const selectedBusiness = this.businessRecords.find(
        (business) => business.business_name === this.form.clearance_name
      );

      if (selectedBusiness) {
        this.form.clearance_owner_name = `${selectedBusiness.first_name} ${selectedBusiness.middle_name} ${selectedBusiness.last_name}`;
        this.form.clearance_tin = selectedBusiness.tin;
      } else {
        this.form.clearance_owner_name = "";
        this.form.clearance_tin = "";
      }
      console.log(
        "Updated clearance_owner_name:",
        this.form.clearance_owner_name
      );
      console.log("Updated clearance_tin:", this.form.clearance_tin);
    },

    deleteClearanceConfirm() {
      // Perform deletion action
      axios
        .post("http://localhost/bms/bmsDB/clearanceCRUD.php", {
          action: "delete",
          clearance_id: this.selectedClearance.clearance_id,
        })
        .then((response) => {
          console.log("Clearance deleted:", response.data);
          // Refresh clearance list or do other necessary updates
          this.fetchClearances();
          // Close delete confirmation dialog
          this.closeDeleteClearance();
        })
        .catch((error) => {
          console.error("Error deleting clearance:", error);
        });
    },

    saveEditClearance() {
      axios
        .post("http://localhost/bms/bmsDB/clearanceCRUD.php", {
          action: "update",
          clearance_id: this.selectedClearance.clearance_id,
          // Include other necessary data fields here
          ...this.selectedClearance,
        })
        .then((response) => {
          console.log("Clearance updated:", response.data);
          // Refresh clearance list or show a success message
          this.fetchClearances();
          // Close edit dialog
          this.closeEditClearance();
        })
        .catch((error) => {
          console.error("Error updating clearance:", error);
        });
    },
    closeEditClearance() {
      this.showEditClearanceDialogs = false;
    },
    closeDeleteClearance() {
      this.showDeleteClearanceDialogs = false;
    },
    closeClearanceDetails() {
      this.showClearanceDetailsDialogs = false;
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
          pattern = /^[a-zA-Z0-9\s'-,]+$/; // Allow letters, numbers, spaces, hyphens, and apostrophes for business_name
        } else {
          pattern = /^[a-zA-Z\s'-,  ]+$/; // Allow only letters, spaces, hyphens, and apostrophes for other text fields
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
    },

    printDetails() {
      window.print();
    },
  },

  created() {
    // Fetch business records from the backend when the component is created
    this.fetchBusinessRecords();
    this.fetchClearances();
  },
};
