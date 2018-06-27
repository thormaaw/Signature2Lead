GetSMILES<- function()
    {
  Compounds<-read.csv(file="LINCSCompounds.csv", stringsAsFactors = FALSE)
  
  compound_rows <- list("integer")
  rows_to_add <- list("integer")


for (i in 1:length(con_comma))
{
rows_to_add <- which(Compounds$SM_LINCS_ID %in% con_comma[[i]][[11]])
compound_rows[[i]] <- rows_to_add
}
selected_compounds <- list("character")
for (i in 1:length(compound_rows))
  {
the_chosen_ones <- Compounds[compound_rows[[i]], c("SM_LINCS_ID", "SM_SMILES_Parent")]
selected_compounds[[i]] <- the_chosen_ones[-which(the_chosen_ones$SM_SMILES_Parent==""),]
}
selected_compounds <<- selected_compounds

########Get Unique
all_compounds <- ldply(selected_compounds, data.frame)
dups <- which(duplicated(all_compounds[,1]))
final_compounds <<- all_compounds[-dups,]              
}
