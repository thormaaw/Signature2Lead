#
# This is the server logic of a Shiny web application. You can run the 
# application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
# 
#    http://shiny.rstudio.com/
#

#########Load all required libraries here, they cannot be sourced
library(shiny)
library(httr)
library(jsonlite)
library(DT)
library(heatmaply)
library(shinyHeatmaply)
library(ChemmineOB)
library(ChemmineR)
library(plyr)
library("dendextend")
library("colorspace")
library(ggforce)
library(rlist)
library(scatterpie)


shinyServer(function(input, output) {
   observeEvent(input$Go,
  print("Get off my back, I'm working"))
#  output$SMILES <- eventReactive(input$Go,
#      {
#        if (!is.null(input$AddedCompounds)){                           
#            test<-input$AddedCompounds
#            test2<-read.SMIset(paste(getwd(), test$name, sep="/"))
            #test2<-readLines(paste(getwd(), test$name, sep="/"))#, sep="\t", header=FALSE)
#            test3<-smiles2sdf(test2)
#            print(test3)
#        }
#                                })
  output$SMILES <- eventReactive(input$Go,
#  output$Go <- eventReactive(input$Go,  
    {    
        source("lib/GeneKD.R", local = TRUE)
        define_knockdown(input$gene_knockdown)
        print("Found your knockdowns")
        source("lib/ConDisconSignatures.R", local = TRUE)
        ConDisconSignatures(sigid)
        print("Found concordant signatures")
        source("lib/GetSMILES.R", local = TRUE)
        GetSMILES()
        print("SMILES acquired")
        output$SMILES <<- DT::renderDataTable(final_compounds)
        source("lib/ChemmineOB.R", local = TRUE)
        
        ###This is the slow step, see if we can go straight from smiles to fingerprints and seperately convert to SDF
        print("Converting SMILES to SDF")
        Get_SDF()
        
        ###
        
        print("SDF conversion complete")
        source("lib/chemmineR.R", local = TRUE)
        
#        if (!is.null(input$AddedCompounds)){                           
#          test<-input$AddedCompounds
#          test2<-read.SMIset(paste(getwd(), test$name, sep="/"))
#          test3<-smiles2sdf(test2)
#          sdf_smiles <<- c(sdf_smiles, test3)
#          }
#        ifelse (!is.null(input$AddedCompounds),                           
         if (!is.null(input$AddedCompounds))      {
                      adds<-input$AddedCompounds
                      adds_SMI<-read.SMIset(paste(getwd(), adds$name, sep="/"))
                      adds_SDF<-smiles2sdf(adds_SMI)
                      sdf_smiles <<- c(sdf_smiles, adds_SDF)
                      cluster_compounds()
                      print("Your compounds have been clustered with LINCS compounds")
                      source("lib/ColorMap.R", local = TRUE)
                      color_dend()
                      #color_dend() currently not rendering
                      #output$distPlot<<- renderPlot(heatmap.2(dist_mat, Rowv=dend, Colv=dend, colRow = heatmap_colors, colCol = heatmap_colors, col=colorpanel(40, "white","yellow","red"), density.info="none", trace="none", labCol=cid(fpset), labRow=cid(fpset), cexRow=0.5, cexCol=0.5))
                }#,
        else
                {
                  cluster_compounds()
                  print("LINCS clustering complete!")
                  output$distPlot <<- renderPlot(heatmap.2(1-simMA, Rowv=as.dendrogram(hc), Colv=as.dendrogram(hc), col=colorpanel(40, "white","yellow","red"), density.info="none", trace="none", labCol=cid(fpset), labRow=cid(fpset), cexRow=0.5, cexCol=0.5))
                }
        #)
        
        
        
        
#        cluster_compounds()
        
#        output$distPlot <<- renderPlot(heatmap.2(1-simMA, Rowv=as.dendrogram(hc), Colv=as.dendrogram(hc), col=colorpanel(40, "white","yellow","red"), density.info="none", trace="none", labCol=cid(fpset), labRow=cid(fpset), cexRow=0.5, cexCol=0.5))
    })
  output$SMILESDownload <- downloadHandler(
    filename = function() {
      paste(input$gene_knockdown, '_compounds.csv', sep='')
    },
    content = function(filename){
      write.csv(final_compounds, filename)
    }
    )
  
  output$SDFDownload <- downloadHandler(
    filename = function() {
      paste(input$gene_knockdown, '.sdf', sep='')
    },
    content = function(filename){
      write.SDF(sdf_smiles, filename)
    }
  )
  
  output$Representatives <- eventReactive(input$GetRepresentatives,
        {
            #source("lib/Centroid.R", local=TRUE)
            source("lib/Centroid2.R", local=TRUE)
            #Add a threshold option for cut_tree and Cluster size
            cut_tree((1-as.numeric(input$CutHeight)))
            if (!is.null(input$AddedCompounds)){
              find_centroid_adds(ClusterMembers, (as.numeric(input$ClusterSize)-1))
            }
            else{
            find_centroid(ClusterMembers, (as.numeric(input$ClusterSize)-1))
            }
            df_centroid <- as.data.frame(unlist(centroid))
            colnames(df_centroid)="Representatives"
            df_centroid<<-df_centroid
            output$Representatives <<- DT::renderDataTable(df_centroid)
            print(paste("Got the centroids as ", centroid[[1]], sep=""))
            source("lib/MDS.R")
            MDS_plot(centroid)
            output$MDSPlot<<- renderPlot(ggplot() + geom_scatterpie(mapping = aes(x=x1, y=y1, r=radius), data=cluster_info, cols=c("LINCS", "Added"))) #"P2Count", "P4Count", "LINCS"))
                                          })
  
  output$RepDownload <- downloadHandler(
    filename = "representatives.csv",
    content = function(filename){
      write.csv(df_centroid, filename)
    }
)
  })
