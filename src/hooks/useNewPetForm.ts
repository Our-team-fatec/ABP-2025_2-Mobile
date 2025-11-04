import { useState } from "react";
import { initialNewPetData, NewPetForm, PetGender } from "../types/cadastroPet";

/**
 * Gerencia o estado do formulário de novo pet.
 * - onSubmit (opcional): callback assíncrona chamada quando o formulário é válido e submetido.
 */
export function useNewPetForm(onSubmit?: (data: NewPetForm) => Promise<boolean>) {
  const [newPetData, setNewPetData] = useState<NewPetForm>(initialNewPetData);

  const handleNewPetChange = <K extends keyof NewPetForm>(
    field: K,
    value: NewPetForm[K]
  ) => {
    setNewPetData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectGender = (gender: PetGender) => {
    handleNewPetChange("gender", gender);
  };

  const handleToggleNeutered = () => {
    setNewPetData((prev) => ({ ...prev, isNeutered: !prev.isNeutered }));
  };

  const isFormValid =
    newPetData.name.trim().length > 0 &&
    newPetData.species.trim().length > 0 &&
    newPetData.gender !== "" &&
    newPetData.birthDate.trim().length > 0;

  /**
   * Reseta o formulário para o estado inicial
   */
  const reset = () => setNewPetData(initialNewPetData);

  /**
   * Submete o formulário se válido. Retorna true/false.
   * Não exibe Alert: responsabilidade da camada de UI.
   */
  const submit = async () => {
    if (!isFormValid) return false;
    if (onSubmit) {
      return await onSubmit(newPetData);
    }
    return true;
  };

  return {
    newPetData,
    handleNewPetChange,
    handleSelectGender,
    handleToggleNeutered,
    // Alias para compatibilidade retroativa
    handleSubmit: submit,
    submit,
    reset,
    isFormValid,
  };
}
