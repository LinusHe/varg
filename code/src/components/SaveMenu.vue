<template>
  <v-dialog v-model="dialog" max-width="380">
    <v-card>
      <v-card-title class="headline">Graph in Datenbank speichern</v-card-title>
      <v-card-text>
        Legen Sie einen Namen für den Graphen in der Datenbank fest.
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col sm="12">
              <v-text-field
                class="mt-6"
                id="DatabaseName"
                label="Datenbankname"
                v-model="DataBaseName"
                outlined
                required
                :rules="[v => !!v || 'Fehlender Name']"
              ></v-text-field>
            </v-col>
          </v-row>
            <v-row>
              <v-col sm="6">
                <v-btn color="success" :disabled="!valid" block outlined @click="save">Speichern</v-btn>
              </v-col>
              <v-col sm="6">
                <v-btn color="error" block outlined @click="clearFields">Abbrechen</v-btn>
              </v-col>
            </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SaveMenu",
  data() {
    return {
      valid: true,
      dialog: false,
      DataBaseName: "",
      label: "Datenbankname"
    };
  },
  methods: {
    setdialog(boolean) {
      this.dialog = boolean;
    },
    setLabel(value) {
      this.DataBaseName = "";
      this.label = value;
    },
    save() {
      if (this.DataBaseName != "" && this.DataBaseName != null) {
        this.$emit("onSaveConfirm", this.DataBaseName);
      } else this.$emit("onSaveConfirm", null);
    },
    clearFields() {
      this.dialog = false;
      this.DataBaseName = "";
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    }
  }
};
</script>