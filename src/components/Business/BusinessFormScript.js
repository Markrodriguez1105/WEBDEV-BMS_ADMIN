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
      validationRules: {
        requiredFields: [
          "business_id",
          "barangay_id",
          "business_name",
          "business_type",
          "monthly_income",
          "vat_status",
          "active_status",
          "first_name",
          "middle_name",
          "last_name",
          "owner_phone_num",
          "address",
          "date_establishment",
          "tin",
          "num_employees",
          "owner_email",
        ],
      },
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
    submit() {
      // Validate the newBusiness object
      if (
        !this.newBusiness.business_id ||
        !this.newBusiness.barangay_id ||
        !this.newBusiness.business_name ||
        !this.newBusiness.business_type ||
        !this.newBusiness.first_name ||
        !this.newBusiness.middle_name ||
        !this.newBusiness.last_name ||
        !this.newBusiness.owner_phone_num ||
        !this.newBusiness.address ||
        !this.newBusiness.monthly_income ||
        !this.newBusiness.date_establishment ||
        !this.newBusiness.tin ||
        !this.newBusiness.vat_status ||
        !this.newBusiness.num_employees ||
        !this.newBusiness.owner_email ||
        !this.newBusiness.active_status
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      // Send a POST request to the server to add a new business
      axios
        .post("http://localhost/WEBDEV-BMS_ADMIN/bmsDB/crud.php", {
          action: "insert",
          business_id: null,
          barangay_id: this.newBusiness.business_id,
          business_name: this.newBusiness.business_name,
          business_type: this.newBusiness.businessType,
          first_name: this.newBusiness.first_name,
          middle_name: this.newBusiness.middle_name,
          last_name: this.newBusiness.last_name,
          owner_phone_num: this.newBusiness.owner_phone_num,
          address: this.newBusiness.address,
          monthly_income: this.newBusiness.monthly_income,
          date_established: this.newBusiness.date_establishment,
          tin: this.newBusiness.tin,
          vat_status: this.newBusiness.vat_status,
          num_employees: this.newBusiness.num_employees,
          date_registered: this.newBusiness.date_registered,
          owner_email: this.newBusiness.owner_email,
          active_status: this.newBusiness.active_status,
        })
        .then((response) => {
          // Log the response
          console.log(response);
          // Clear the newBusiness object
          this.newBusiness = {};
          // Fetch the updated list of businesses
          this.fetchBusinessRecords();
        })
        .catch((error) => {
          // Log the error
          console.error("Error inserting record:", error);
        });
    },

    saveAdd() {
      // Required fields
      const requiredFields = [
        'business_name',
        'business_type',
        'first_name',
        'middle_name',
        'last_name',
        'owner_phone_num',
        'address',
        'monthly_income',
        'date_establishment',
        'tin',  
        'vat_status',
        'num_employees',
        'owner_email',
        'active_status'
      ];
    
      // Check if any required field is empty
      const missingFields = requiredFields.filter(field => !this.newBusiness[field]);
    
      if (missingFields.length > 0) {
        console.error("Missing required fields:", missingFields.join(", "));
        alert("Please fill in all required fields.");
        return;
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
      // Reset the newBusiness object
      this.newBusiness = {
        monthly_income: "",
        vat_status: "",
        active_status: "",
        owner_phone_num: "",
        owner_email: "",
        address: "",
        num_employees: "",
        tin: "",
        date_establishment: "",
        date_registered: "",
        barangay_id: 0,
        business_id: 0,
      };
      this.resetNewBusiness();
      // Show the add form dialog
      this.showAddDialog = true;
    },

    saveEdit() {
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

    cancelEdit() {
      // Reset the selected business and close the edit dialog
      this.selectedBusiness = {};
      this.showEditDialog = false;
    },
    editItem(item) {
      // Set selectedBusiness to the item being edited
      this.selectedBusiness = { ...item };

      // Call the edit method to save changes to the database
      this.edit(this.selectedBusiness);

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
  },
  created() {
    // Fetch business records from the backend when the component is created
    this.fetchBusinessRecords();
  },
};
