<template>
    <v-dialog v-model="dialog" max-width="350">
        <v-card>
            <v-card-title class="headline">Speichern</v-card-title>
            <v-card-text>
                Legen sie einen Namen für den Graphen in der Datenbank fest.
                <v-row>
                    <v-text-field
                            class="mt-2"
                            id="DatabaseName"
                            label="Datenbankname"
                            v-model="DataBaseName"
                            outlined
                            hide-details
                            required
                            :rules="[v => !!v || 'Fehlender Name']"
                            >
                    </v-text-field>
                    <v-card-actions>
                        <v-col sm="6">
                            <v-btn color="success" outlined @click="save">Speichern</v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col sm="6">
                            <v-btn color="error" outlined @click="clearFields">Abbrechen</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'SaveMenu',
    data()  {
        return{
            dialog: false,
            DataBaseName: "",
            label: "Datenbankname"
        };
    },
    methods:    {
        setdialog(boolean) {
            this.dialog=boolean
        },
        setLabel(value) {
            this.DataBaseName=""
            this.label=value
        },
        save()  {
            if (this.DataBaseName!= "" && this.DataBaseName!= null){
                this.$emit('onSaveConfirm',this.DataBaseName)
            }
            else this.$emit('onSaveConfirm',null)
        },
        clearFields()   {
            this.dialog=false
            this.DataBaseName=""
        }
    }
}
</script>