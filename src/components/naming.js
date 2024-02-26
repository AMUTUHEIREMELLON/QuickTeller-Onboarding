// public string AgentName { get; set; }

//         public string AgentBusinessDescription { get; set; }

//             public string Phone { get; set; }

//          public string Email { get; set; }
 
 
 
//         // [componentAnnotations::System.ComponentModel.DataAnnotations.StringLength(20, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 3)]
//          [componentAnnotations::System.ComponentModel.DataAnnotations.DataType(componentAnnotations::System.ComponentModel.DataAnnotations.DataType.Text)]
//          [componentAnnotations::System.ComponentModel.DataAnnotations.Display(Name = "Physical Location")]
//          public string PhysicalLocation { get; set; }
 
//         // [componentAnnotations::System.ComponentModel.DataAnnotations.StringLength(20, ErrorMessage = "The {0} must be at least {4} characters long.", MinimumLength = 3)]
//          [componentAnnotations::System.ComponentModel.DataAnnotations.DataType(componentAnnotations::System.ComponentModel.DataAnnotations.DataType.Text)]
//          [componentAnnotations::System.ComponentModel.DataAnnotations.Display(Name = "Village")]
//          public string Village { get; set; }
 
//         // [componentAnnotations::System.ComponentModel.DataAnnotations.StringLength(20, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 3)]
//          [componentAnnotations::System.ComponentModel.DataAnnotations.DataType(componentAnnotations::System.ComponentModel.DataAnnotations.DataType.Text)]
//          [componentAnnotations::System.ComponentModel.DataAnnotations.Display(Name = "LC")]
//          public string LC { get; set; }
//          public string District { get; set; }
//          public string Region { get; set; }
//          public string RuralUrban { get; set; }
//          public string GPS_Co_ordinates { get; set; }
//  [componentAnnotations::System.ComponentModel.DataAnnotations.DataType(componentAnnotations::System.ComponentModel.DataAnnotations.DataType.Text)]
//          [componentAnnotations::System.ComponentModel.DataAnnotations.Display(Name = "Names of Agent Business Directors")
//          public string DirectorName { get; set; }
 
//          [componentAnnotations::System.ComponentModel.DataAnnotations.DataType(componentAnnotations::System.ComponentModel.DataAnnotations.DataType.Text)]
//          [componentAnnotations::System.ComponentModel.DataAnnotations.Display(Name = "Agent T.I.N Number")]
//          public string TIN_No { get; set; }
 
//          [componentAnnotations::System.ComponentModel.DataAnnotations.DataType(componentAnnotations::System.ComponentModel.DataAnnotations.DataType.Text)]
//          [componentAnnotations::System.ComponentModel.DataAnnotations.Display(Name = "Postal Address")]
//          public string PostalAddress { get; set; }
 
        
//         //----
 
//         //----
 
 
//         public int BranchId { get; set; }
//         public int TempUseSessionId { get; set; }
//         public long AgentId { get; set; }
//         public int? AgentUniqueId { get; set; }
//         public string BranchName { get; set; }
//         public string InstName { get; set; }
//         public string ApplicationType { get; set; }
//         public int? ApplicationId { get; set; }
//         public string InstitutionCode { get; set; }
//         public bool isAgentInBranch { get; set; }
//         public bool isWebPartner { get; set; }
//         public bool? isNinValidated { get; set; }
//         public string Recruiter { get; set; }
//         public string BusinessSector { get; set; }
//         public string BusinessTier { get; set; }
//         public int NumberOfOutlets { get; set; }
 
//         public DateTime? ApprovalDate { get; set; }
//         public string ApprovedBy { get; set; }
//         public DateTime? LogDate { get; set; }
//         public Decimal? Amount { get; set; }
//         public DateTime? OperationAccountOpenDate { get; set; }
//         public string BOUStatus { get; set; }
//         public string CurrentStage { get; set; }
//         public string Memo { get; set; }
//         public DateTime? StageLastUpdatedOn { get; set; }
//         public int? LastUpdatedByUserId { get; set; }
//         public string LastUpdatedByName { get; set; }
//         public int? PersonResponsible { get; set; }
//         public string PersonResponsibleName { get; set; }
//         public int? ReAssignedTo { get; set; }
//         public string ReAssignedToName { get; set; }
//         public int BranchIdAppliedFrom { get; set; }
//        // public string services { get; set; }
//         public string notification { get; set; }
//         public string ApplicationSLA { get; set; }
//         public string ProcessingSLA { get; set; }
 
//         public string Contracting { get; set; }
//         public string Branding { get; set; }
//         public string Training { get; set; }
//         //public string FreshersTraining { get; set; }
//         public string LastTrainedOn { get; set; }
//         public string TerminalIssue { get; set; }
//         public string ActivityStatus { get; set; }
//         public byte? Sex { get; set; }
//         public string OperatorName { get; set; }
//         public string OperatorPhone { get; set; }
//         public string OperatorNIN { get; set; }
//         public string RegionSupervisor { get; set; }
//         public string AgentRecruitor { get; set; }
//         public string StreetName { get; set; }
//         public string BuildingName { get; set; }
//         public string AgentNin { get; set; }
//         public bool IsLicensedBusiness { get; set; }
//         public bool ResidentinArea { get; set; }
//         public string NatureofBusiness { get; set; }
//         public string CompanyRegistrationNumber { get; set; }
//         public string CompanyWebsite { get; set; }
//         public string Ownership { get; set; }
//         public string BankName { get; set; }
//         public string BankBranch { get; set; }
//         public string AccountName { get; set; }
//         public string AccountNumber { get; set; }
//         public string AccountType { get; set; }
//         public string NextofKin { get; set; }
//         public string KinPhoneNumber { get; set; }
//         public string KinRelationship { get; set; }
//         public string NameofBeneficiary { get; set; }
//         public string BeneficiaryPhoneNumber { get; set; }
//         public string Residence { get; set; }
//         public string BRelationship { get; set; }
//         public DateTime? WorkinginAreaSince { get; set; }
//         public string TypeofShop { get; set; }
//         public string ShopOwnership { get; set; }
 
 
//         public DateTime? DateOfBirth { get; set; }
//         public DateTime? DateOfRegistration { get; set; }
 
        
//         //File Attachments
//         public string Registrationcertificate { get; set; }
//         public string BankStatement { get; set; }
//         public string TradingLicence { get; set; }
//         public string ProofOfBusinessEngagement { get; set; }
//         public string CRBreport { get; set; }
//         public string CriminalRecord { get; set; }
//         public string BusinessReference { get; set; }
//         public string PremisesPictures { get; set; }
//         public string AgentApplicationForm { get; set; }
//         public string IdentityCard { get; set; }
//         public string OutletPhoto { get; set; }
//         public string OwnerNationalId { get; set; }
//         public string SignedAgreementForm { get; set; }
//         public string OperatorNationalId { get; set; }
//         public string Lc1Recommendation { get; set; }
//         public string AgentPassportPhoto { get; set; }
//         public string Services { get; set; }
 
//         public HttpPostedFileBase[] DirectorPhotos { get; set; }
//         public HttpPostedFileBase[] Otherfiles { get; set; }
 
//         public List<FileUploadModel> fileAttachments { get; set; }
//         public Dictionary<string, HttpPostedFileBase> files { get; set; }
//         public Dictionary<string, string> filesNames { get; set; }
//         public bool IsSLAPassed { get; set; }
//         public bool IsProcessingSLAPassed { get; set; }

// [Yesterday 11:44 PM] Monicah Mirembe
// ,[LogDate]

//       ,[agentNumber]

//       ,[name]

//       ,[businessDescription]

//       ,[DirectorName]

//       ,[NumberOfOutlets]

//       ,[physicalLocation]

//       ,[Village]

//       ,[LC]

//       ,[District]

//       ,[Region]

//       ,[GPS_Co_ordinates]

//       ,[Area]

//       ,[TelephoneNumber]

//       ,[Email]

//       ,[PostalAddress]

//       ,[BranchId]

//       ,[ApprovalDate]

//       ,[Amount]

//       ,[OperationAccount]

//       ,[OperationAccountOpenDate]

//       ,[SentBOUReviewOn]

//       ,[BOUApprovalDate]

//       ,[BOUStatus]

//       ,[CurrentStage]

//       ,[StageLastUpdatedOn]

//       ,[LastUpdatedByUserId]

//       ,[Memo]

//       ,[PersonResponsible]

//       ,[ReAssignedTo]

//       ,[BranchIdAppliedFrom]

//       ,[Recruiter]

//       ,[Status]

//       ,[TIN_No]

//       ,[Is_Trained]

//       ,[SignedContract]

//       ,[Branded]

//       ,[TerminalIssued]

//       ,[ActivityStatus]

//       ,[ContractingUpdateOn]

//       ,[LastTrainedOn]

//       ,[TerminalssuedOn]

//       ,[BrandedOn]

//       ,[AgentUniqueId]

//       ,[OutletID]

//       ,[instCode]

//       ,[DateOfBirth]

//       ,[DateOfRegistration]

//       ,[LicensedBusiness]

//       ,[OperatorName]

//       ,[RecruiterName]

//       ,[RegionalSupervisor]

//       ,[StreetName]

//       ,[OperatorPhone]

//       ,[BuildingName]

//       ,[AgentNin]

//       ,[OperatorNin]

//       ,[Sex]

//       ,[IsLicensedBusiness]

//       ,[ResidentinArea]

//       ,[CompanyRegistrationNumber]

//       ,[NatureofBusiness]

//       ,[CompanyWebsite]

//       ,[Ownership]

//       ,[BankName]

//       ,[BankBranch]

//       ,[AccountName]

//       ,[AccountNumber]

//       ,[AccountType]

//       ,[NextofKin]

//       ,[KinPhoneNumber]

//       ,[KinRelationship]

//       ,[NameofBeneficiary]

//       ,[BeneficiaryPhoneNumber]

//       ,[Residence]

//       ,[BRelationship]

//       ,[WorkinginAreaSince]

//       ,[TypeofShop]

//       ,[ShopOwnership]

//       ,[IsWebPartner]

//       ,[BusinessSector]

//       ,[BusinessTier]

//       ,[isNinValidated]

//       ,[Services]

//       ,[OnboardType]

//   FROM [paypoint_staging_db].[dbo].[Agent_Applications]

