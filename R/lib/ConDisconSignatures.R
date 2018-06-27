########################################
# Find Con/Dis/cordant Signtures
########################################

ConDisconSignatures <- function(signatureID)
  {
  con_comma <<- list("character")
  for (i in 1:length(signatureID))
  {
#url2 <- paste("http://www.ilincs.org/api/SignatureMeta/findConcordantSignatures?sigID=%22",signatureID,"%22&lib=%22LIB_5%22", sep="")
    url2 <- paste("http://www.ilincs.org/api/SignatureMeta/findConcordantSignatures?sigID=%22",signatureID[[i]],"%22&lib=%22LIB_5%22", sep="")
df <- fromJSON(url2)
df2<- df[order(df$similarity), ]


con <- df2[df2$similarity > 0.321,]
#discon <- df2[df2$similarity < -0.235, ]
concordant_list <- list("character")
    for (j in 1:length(con))
      {
      concordant_list[j] <- con[j]
    }

con_comma[[i]] <- concordant_list

#con_comma <<- paste(con$perturbagenID, collapse="%22,%22")
#print(con_comma)
  }
  con_comma <<- con_comma
}
