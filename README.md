# **ENUM30 x Musit**
> 기업협약 프로젝트
이더리움 기반 NFT 음원 스트리밍 플랫폼 개발


![image](https://user-images.githubusercontent.com/89626182/166390125-b8d7194d-c992-4af3-a51c-fa0255e8df22.png)

### 기간 : `2022-03-08 ~ 2022-05-02`

### 팀원 및 역할

- [Haemin Park](https://github.com/euphratesriver0216) : UI/UX 설계, 디자인 총괄
    
- [Seokhun Yoon](https://github.com/imysh578) : 스마트 컨트랙트, 리덕스
    
- [Cheolsoon Lim](https://github.com/POcodingWER) : 음원 스트리밍 서비스, 음원 검색 및 추천 알고리즘
    
- [Jin-young Jeon](https://github.com/jeonjinoung) : 회원가입, 서버 설계

***


# 목차
[1. 개요](#개요)
[2. 사용한 기술](#사용한-기술)
[3. 상세 설명](#상세-설명)
[4. 이슈 관리](#이슈-관리)


***

## 📒 개요

### 1. 목적
이더리움 기반 NFT와 음원 스트리밍 서비스를 결합한 플랫폼 개발
<img src="https://user-images.githubusercontent.com/33863016/166393797-1facd03f-8e1c-47ef-81f3-eed69ae89bb0.png"/>

### 2. 주요기능
#### 1) 구독권
- 구독권 구매 후 음원 청취 가능
- 최초 가입자 30일 무료 쿠폰 지급

#### 2) 음원 스트리밍 서비스
- 음원 등록
- 하단 플레이바를 통해 청취
- 상단바 검색 기능

#### 3) NFT 발행
- 등록된 음원을 NFT로 발행
- `ERC721` 규격 사용

#### 4) 거래소
- NFT 일반판매
- English Auction




***

## 사용한 기술
### ⚙ Dev Environments
- `Ubuntu-20.04`
- `VScode`

### 📚 Languages
- `TypeScript`
- `JavaScript`
- `Solidity`

### ✨ Front-end
- `React`
- `Redux`
- `MUI`

### 🖥 Server & DB
- `NodeJS`
- `MySQL`
- `AWS RDS`
- `AWS S3`
- `IPFS`

### 💻 Deploy
- `AWS EC2` : deploy
- `nginx` : client
- `pm2` : server

### ⛓ Blockchain
- `Hardhat`
- `ethers.js`
- `Alchemy`

### 🧪 Test-tool
- `Mocha`
- `Chai`

### 📢 For Team Communication

- `Discord`
- `Notion`
- `Github`
- `Teams`

***

## ⚙ 상세 설명
### API 정의서
[Docs Link](https://www.notion.so/API-Docs-8b91a8fb6ec64385b2980b1fb9b4d904)
<img width="100%" alt="스크린샷 2021-10-15 오후 3 51 02" src="https://user-images.githubusercontent.com/89626182/166393019-15a2bc67-d164-4069-bb0b-60d42dc17888.png">

### 기능 명세서
[Docs Link](https://www.notion.so/Page-Functional-specification-61a617b23e1b471d83ab4fb8f5d347b1)
<img width="100%" alt="스크린샷 2021-10-15 오후 3 51 02" src="https://user-images.githubusercontent.com/89626182/166393038-9e9a1667-c5b5-44f9-9dda-50cc34971428.png">
### DB 테이블 관계도
![DB EER Diagram](https://user-images.githubusercontent.com/89626182/166389973-e636ed03-2881-4d57-9e86-1e20a606166c.png)


## 🤬 이슈 관리
- 발생한 이슈는  Github Issue에서 관리
[Go to Github Issue](https://github.com/enum30-BlockChain/Musit/issues)
<img width="100%" src="https://user-images.githubusercontent.com/33863016/166393283-2e4f8e93-8cc8-468d-8f74-d84c23625951.png">
<img width="50%" src="https://user-images.githubusercontent.com/33863016/166393369-dcf981b5-da08-44d6-b65b-9ccd485f8887.png">
<img width="50%" src="https://user-images.githubusercontent.com/33863016/166393417-c01654ba-6d55-480b-86c0-8682f6ba6cad.png">
