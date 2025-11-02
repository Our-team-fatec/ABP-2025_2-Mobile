import { StyleSheet } from "react-native";

export const cadastroPetStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fafcfa",
    padding: 16,
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#a7e0b3",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#064e3b",
  },
  notification: {
    backgroundColor: "red",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  notificationText: {
    color: "#fff",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
},
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
    textAlign: "center"
  },
  actionContent:{
    flexDirection:"column",
    alignItems: "center",
    gap: 6,
  },
  actionIcon:{
    marginRight: 2,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
  backgroundColor: "#f1fff8ff",
  },
  activeLostButton: {
    backgroundColor: "rgba(250, 235, 232, 1)"
  },
  activeRegisterButton: {
    backgroundColor: "#bbbbbbff",
  },
  dangerButton: {
    backgroundColor: "#fdd7d7ff",
  },
  lostButton:{
    backgroundColor: "#ffffffff",
    borderColor: "#f5e6de"
  },
  mypetButton: {
    backgroundColor: "#f1fff8ff",
    borderColor: "#d8fce9ff"
  },
  addButton: {
    backgroundColor: "#ffffffff",
    borderColor: "#d7ffecff"
  },
  pressedButton: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  actionText: {
    fontSize: 12,
    color: "#111827",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderColor:"#00ff88ff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  petImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    resizeMode: "cover",
  },
  petHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  petActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  iconButtonFirst: {
    marginLeft: 0,
  },
  iconButtonHover: {
    backgroundColor: "#e5e7eb",
  },
  iconButtonPressed: {
    backgroundColor: "#f3f4f6",
  },
  petInfo: {
    fontSize: 12,
    color: "#6b7280",
  },
  petStatus: {
    fontSize: 11,
    marginTop: 2,
  },
  viewButton: {
    marginLeft: 18,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e3ede5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "#ffffffff",
  },
  viewText: {
    paddingLeft: 6,
    fontSize: 12,
    color: "#74a57f",
  },
  addPetButton: {
    borderWidth: 2,
    borderColor: "#d0e0d3",
    borderStyle: "dashed",
    backgroundColor: "#f6fcf6ff",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 10,

  },
  addPetButtonHover:{
    borderColor: "#d0e0d3",
    backgroundColor: "#eefaf1",
  },
  addPetText: {
    fontWeight: "600",
    fontSize: 14,
  },
  addPetSubtitle: {
    fontWeight: "400",
    color: "#6b7280",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 12,
  },
  petSucess: {
    color: "#059669"
  },
  petNeutral: {
    color: "#5f6674ff"
  },
  petAlert: {
    color: "#bc5d2e"
  },
  petPendente: {
    color: "#f4d35e"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.55)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    width: "100%",
    maxHeight: "100%",
    justifyContent: "flex-end",
  },
  modalSheet: {
    width: "100%",
    maxHeight: "90%",
    alignSelf: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    width: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#d1d5db",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  modalFormScroll: {
    flexGrow: 0,
    width: "100%",
  },
  modalFormContent: {
    paddingBottom: 16,
    gap: 12,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    gap: 12,
    backgroundColor: "#f9fafb",
  },
  modalHeader: {
    gap: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#064e3b",
    textAlign: "center"
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#4b5563",
  },
  sectionTitleModal: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f2937",
  },
  photoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#d1d5db",
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  photoButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#cde7d6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  photoButtonLabel: {
    fontSize: 13,
    color: "#047857",
    fontWeight: "600",
  },
  modalField: {
    gap: 6,
  },
  modalLabel: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#f9fafb",
    fontSize: 14,
    color: "#111827",
  },
  modalTextArea: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  selectContainer: {
    position: "relative",
  },
  selectTrigger: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectTriggerText: {
    fontSize: 14,
    color: "#111827",
  },
  selectPlaceholder: {
    color: "#9ca3af",
  },
  selectDropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  selectOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  selectOptionActive: {
    backgroundColor: "#ecfdf5",
  },
  selectOptionText: {
    fontSize: 14,
    color: "#111827",
  },
  selectOptionTextActive: {
    color: "#047857",
    fontWeight: "600",
  },
  modalRow: {
    flexDirection: "row",
    gap: 12,
  },
  genderRow: {
    flexDirection: "row",
    gap: 12,
  },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
  },
  genderOptionActive: {
    borderColor: "#047857",
    backgroundColor: "#ecfdf5",
  },
  genderRadio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#9ca3af",
  },
  genderRadioActive: {
    borderColor: "#047857",
    backgroundColor: "#047857",
  },
  genderLabel: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  inputWithIconText: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9ca3af",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxBoxChecked: {
    backgroundColor: "#047857",
    borderColor: "#047857",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#111827",
  },
  modalRowItem: {
    flex: 1,
    gap: 6,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 4,
  },
  modalButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonLabel: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  modalCancelButton: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  modalCancelButtonLabel: {
    color: "#374151",
  },
  modalPrimaryButton: {
    backgroundColor: "#10b981",
  },
  modalPrimaryButtonLabel: {
    color: "#fff",
  },
  modalButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  modalButtonDisabledLabel: {
    color: "#e5e7eb",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "#ff6b6b",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#74a57e",
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  emptySubtext: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  }
});