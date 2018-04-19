###############################
# ChemmineR Clustering of Analog
##############################
library(ChemmineR)
library(help="ChemmineR")
library("gplots")

sdfset <- read.SDFset("sdf_smiles.sdf")
#sdfset <- sdf_test
valid <- validSDF(sdfset)
unique_ids <- makeUnique(sdfid(sdfset))
cid(sdfset) <- unique_ids
rpropma <- data.frame(MF=MF(sdfset), MW=MW(sdfset))
plot(sdfset[1:3], print=FALSE)


apset <-sdf2ap(sdfset)
fpset<-desc2fp(apset)
simMA <- sapply(cid(fpset), function(x) fpSim(fpset[x], fpset, sorted=FALSE))
hc <-hclust(as.dist(1-simMA), method="average")
par(cex=0.3)
plot(as.dendrogram(hc),edgePar=list(col=4, lwd=2),horiz=TRUE)
heatmap.2(1-simMA, Rowv=as.dendrogram(hc), Colv=as.dendrogram(hc), col=colorpanel(40, "white","yellow","red"), density.info="none", trace="none", labCol=cid(fpset), labRow=cid(fpset), cexRow=0.5, cexCol=0.5)
