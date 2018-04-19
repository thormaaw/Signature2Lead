######################################
# iLincs Extract Concordant Signatures
#####################################

library(cmapR)

###################################################################################
# Map metadata for perurbagen
###################################################################################
library(httr)
library(jsonlite)
library(lubridate)



####################################
# User Input Variable (Gene KD)
####################################
usr <- "bcl2a1"

url1 <- paste("http://www.ilincs.org/api/SignatureMeta?filter=%7B%22where%22%3A%7B%22treatment%22%3A%22",usr,"%22%2C%20%22libraryid%22%3A%22LIB_6%22%7D%7D", sep="")

raw.result <- GET(url = url1)
raw.result$status_code
sigid <- content(raw.result)[[1]]$signatureid
#e201f96e629b5741375fd1c58a46e3d6

########################################
# Find Con/Dis/cordant Signtures
########################################


url2 <- paste("http://www.ilincs.org/api/SignatureMeta/findConcordantSignatures?sigID=%22",sigid,"%22&lib=%22LIB_5%22", sep="")

df <- fromJSON(url2)
df2<- df[order(df$similarity), ]


con <- df2[df2$similarity > 0.321,]
discon <- df2[df2$similarity < -0.235, ]

con_comma <- paste(con$perturbagenID, collapse="%22,%22")
##########################################
# Get Smiles
##########################################

#url3 <- "https://api.clue.io/api/perts?filter={%22fields%22:[%22canonical_smiles%22,%22pert_iname%22],%22where%22:{%22pert_id%22:{%22inq%22:[%22BRD-K14444135%22,%22BRD-K46272620%22]}}}&user_key=e201f96e629b5741375fd1c58a46e3d6"
              
url3 <- paste("https://api.clue.io/api/perts?filter={%22fields%22:[%22canonical_smiles%22,%22pert_iname%22],%22where%22:{%22pert_id%22:{%22inq%22:[%22",con_comma,"%22]}}}&user_key=e201f96e629b5741375fd1c58a46e3d6", sep="")

#df3 <- fromJSON(url3)

raw.result3 <- GET(url = url3)
#names(raw.result)
raw.result3$status_code
x3<-content(raw.result3)

##########################################
# Input SMILES into ZINC
##########################################

library(ChemmineR)

smiles<-lapply(x3, function(l) l[[1]])
#smiles_plus <-paste(smiles[], collapse="+")
#url4 <- paste("https://zinc15.docking.org/substances/subsets/for-sale.sdf?count=all&ecfp4_fp-tanimoto-80=",smiles_plus, sep="")

linecount <- 0
for (line in smiles[1:10]){
  urlsmile=line
  url4 <- paste("https://zinc15.docking.org/substances/subsets/for-sale.sdf?count=all&ecfp4_fp-tanimoto-80=",urlsmile, sep="")
  raw.result4 <- GET(url=url4, timeout())
  raw.result4$status_code
  if (linecount < 1) {
    FullSDF<-raw.result4
  } else{
    FullSDF<-paste(FullSDF, raw.result4, sep="\n")
  }
  linecount <- linecount + 1
}
#url4 <- paste("https://zinc15.docking.org/substances/subsets/for-sale.sdf?count=all&ecfp4_fp-tanimoto-80=",smiles[1], sep="")  
#right now is only searching one SMILES code

########This is currently giving some random stuff when ZINC is too slow to respond 
########It also runs for a long time.
sdf1 <-rawToChar(charToRaw(FullSDF))

#raw.result4 <- GET(url = url4)
#names(raw.result4)
#raw.result4$status_code
#raw.result4

#sdf_test <- content(raw.result4) 
#sdf1 <- rawToChar(content(raw.result4))
#sdf1 <- as(character, "SDFstr")
write.SDF(sdf1, file="write_sdf.sdf", cid=TRUE)
write.csv(sdf1, file="test.sdf")
