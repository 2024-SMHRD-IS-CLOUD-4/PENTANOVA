package com.smhrd.ptnv.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.mock.web.MockMultipartFile;

import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.smhrd.ptnv.service.BucketService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bucket")
public class BucketController {
	private final BucketService fileService;

	@PostMapping("/upload")
	public ResponseEntity<Object> uploadFilesSample(@RequestPart(value = "img") String base64Image,
			@RequestPart(value = "filename") String filename) throws IOException {
		byte[] decodedBytes = Base64.decodeBase64(base64Image);
		ByteArrayInputStream bis = new ByteArrayInputStream(decodedBytes);
		MultipartFile multipartFile = new MockMultipartFile("image.png", bis);
		List<MultipartFile> asd = new ArrayList<MultipartFile>();
		asd.add(0, multipartFile);
		System.out.println(multipartFile);
		return ResponseEntity.status(HttpStatus.OK).body(fileService.uploadFiles(asd, filename));
	}

	@GetMapping("/getImages/**")
	public ResponseEntity<byte[]> testSample(HttpServletRequest request) throws IOException {
		String currentPath = request.getRequestURI();
		String path = currentPath.split("/")[4] + "/" + currentPath.split("/")[5];
		if (currentPath.split("/").length == 7) {
			path += "/" + currentPath.split("/")[6];
		} else {

		}
		S3ObjectInputStream img = fileService.getImages(path);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(IOUtils.toByteArray(img));
	}

}