package com.smhrd.ptnv.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.smhrd.ptnv.service.BucketService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Controller  
@RequiredArgsConstructor  
@RequestMapping("/bucket")
public class BucketController {  
    private final BucketService fileService;  
  
    @PostMapping("/upload")  
    public ResponseEntity<Object> uploadFilesSample(@RequestPart(value = "files") List<MultipartFile> multipartFiles, @RequestPart(value="filename") String filename) {  
    	System.out.println(multipartFiles);
    	System.out.println(filename);
            return ResponseEntity  
                    .status(HttpStatus.OK)  
                    .body(fileService.uploadFiles(multipartFiles, filename));  
    }  
    
    @GetMapping("/getImages/**")
    public ResponseEntity<byte[]> testSample(HttpServletRequest request) throws IOException {
    	String currentPath = request.getRequestURI();
        String path = "penta/"+currentPath.split("/")[4];
        S3ObjectInputStream img = fileService.getImages(path);
        return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG)
            .body(IOUtils.toByteArray(img));
    }
}