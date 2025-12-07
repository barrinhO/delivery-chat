export const chatStyles = (theme) => ({
  inputArea: {
    flexDirection: "row",
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: theme.border,
  },
  input: {
    flex: 1,
    color: theme.text,
    paddingHorizontal: 12,
  },
  sendBtn: {
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  sendText: {
    color: theme.primary,
    fontWeight: "700",
  },
});
