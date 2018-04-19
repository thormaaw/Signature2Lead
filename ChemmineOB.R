library(ChemmineOB)

smiles<-lapply(x3, function(l) l[[1]])
x3_unlist <- unlist(x3, recursive=FALSE)

var<-as(smiles, "SMIset")
fixed_var<-var[c(1:192, 194:233, 235:578)]
cid(fixed_var) <-makeUnique(cid(fixed_var))

############Manually remove junk##############

write.SMI(var, file="smiles_smi.smi")
fixed_var<-read.SMIset(file="fixed_smiles.smi")
#convertFormatFile("SMI","SDF","smiles_smi.smi", "smiles_smi.sdf")

sdf_smiles <- smiles2sdf(fixed_var)

write.SDF(sdf_smiles, "sdf_smiles.sdf")

