<template>
    <div class="mx-3 my-2 card">
        <div class="row">
            <div class="col d-flex">
                <pre>RQST: </pre>
                <pre>Jochebed Miranda</pre>
            </div>
            <div class="col d-flex">
                <pre>DOC ID: </pre>
                <pre>22-10118</pre>
            </div>
            <hr>
            <div class="row det">
                <div class="col">
                    <pre>Name: </pre>
                    <p>Mark Anthony A. Rodriguez</p>
                </div>
                <div class="col">
                    <pre>Phone Number: </pre>
                    <p>09637752208</p>
                </div>
                <div class="col">
                    <pre>Email: </pre>
                    <p>markanthony.rodriguez @unc.edu.ph</p>
                </div>
                <div class="col">
                    <pre>Address: </pre>
                    <p>Zone 5, La Purisima, Lupi, Camarines Sur</p>
                </div>
                <div class="col">
                    <pre>Document Type: </pre>
                    <p>Indigency</p>
                </div>
                <div class="col">
                    <pre>Payment Status: </pre>
                    <p>Paid</p>
                </div>
                <div class="col">
                    <pre>Purpose: </pre>
                    <p>Sample Purpose Here</p>
                </div>
            </div>
            <hr>
            <div class="buttons">
                <v-row class="ma-0">
                    <v-col cols="auto" class="d-flex pa-0 ga-3">
                        <v-btn width="100" flat color="primary">Edit</v-btn>
                        <v-btn width="100" flat color="primary">Del</v-btn>
                    </v-col>
                </v-row>
                <v-row class="ma-0">
                    <v-col cols="auto" class="d-flex pa-0 ga-3">
                        <v-btn width="100" flat color="primary">Payment</v-btn>
                        <v-btn width="100" flat color="primary">Print</v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>
<style scoped>
.info {
    display: flex;
    margin: 0;
    padding: 0;
}

.det pre,
p {
    font-size: .9rem;
    font-family: "Poppins";
}

.det pre:nth-child(odd) {
    font-size: .7rem;
    font-family: "Poppins";
}

.card {
    width: 15%;
}

.buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: .5rem;
    padding: 0;
    gap: 1rem;
}
</style>