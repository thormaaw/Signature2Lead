#library(ChemmineOB)
#library(ChemmineR)

Get_SDF<-function()
{
#smiles<-lapply(x3, function(l) l[[1]])
#x3_unlist <- unlist(x3, recursive=FALSE)

#var<-as(smiles, "SMIset")
#smi <- as.character(selected_compounds$SM_SMILES_Parent)
var<-as(final_compounds$SM_SMILES_Parent, "SMIset")

#fixed_var<-var[c(1:192, 194:233, 235:578)]
#cid(fixed_var) <-makeUnique(cid(fixed_var))
#cid(var) <-makeUnique(cid(var))

cid(var)<-final_compounds$SM_LINCS_ID

############Manually remove junk##############

write.SMI(var, file="smiles_smi.smi")
#fixed_var<-read.SMIset(file="smiles_smi.smi")
#convertFormatFile("SMI","SDF","smiles_smi.smi", "smiles_smi.sdf")

#sdf_smiles <- smiles2sdf(fixed_var)
sdf_smiles <<- smiles2sdf(var)

#write.SDF(sdf_smiles, "sdf_smiles.sdf")
}
#Cluster73sdf <- read.SDFset("Cluster73")
#Cluster73smi <-sdf2smiles(Cluster73sdf)
#write.SMI(Cluster73smi, file="Cluster73.smi")
