// mockdata.js

const getSingleAlert = (id) => ({
    ClientDbId: id || 1001,
    Uniqueness: "unique-string-byte",
    IncidentName: "Malicious File Detected",
    IncidentDescription: "A known malicious file was executed.",
    IncidentJsonDescription: "{}",
    IncidentRecomendation: "Isolate host and delete file.",
    HostId: 555001,
    HostIp: "192.168.1.15",
    HostName: "WORKSTATION-01",
    ProductId: 1,
    Sha256: "a1b2c3d4e5f6...",
    Sha256Hex: "a1b2c3d4e5f6...",
    Path: "C:\\Users\\Admin\\Downloads\\malware.exe",
    CommandLine: "malware.exe -run",
    AlertIp: 3232235791, // Long IP representation
    AlertDomain: "evil.com",
    DomainId: 666,
    AlertUrl: "http://evil.com/payload",
    UserId: 8080,
    UserName: "Admin",
    Severity: 4, // High
    Status: 0, // Open
    AlertType: 0, // File
    DateIn: new Date().toISOString(),
    LastSeen: new Date().toISOString(),
    DateChanged: new Date().toISOString(),
    RemediationStatus: 0,
    DomainCrc: 123456,
    EpsActionStatus: 0,
    File: {
        ClientDbId: id || 1001,
        Sha256: "a1b2c3d4e5f6...",
        CommonFileName: "malware.exe",
        MetaProductName: "Unknown",
        Company: "Unknown",
        RiskLevel: 5,
        EndPoints: 1,
        Antivirus: 0,
        VtRiskLevel: 10,
        LastSeen: new Date().toISOString(),
        DateIn: new Date().toISOString()
    },
    AlertGraphJsonResolved: "{}",
    AlertGraphJsonRaw: "{}",
    AutoRemediate: {
        DbId: 500,
        RuleName: "Block Malicious Files",
        AlertName: "Malicious File",
        Description: "Auto blocked",
        AlertId: id || 1001,
        Severity: "High",
        Priority: 1,
        DomainToBlock: "evil.com",
        UrlToBlock: "http://evil.com/payload",
        IpToBlock: "1.2.3.4",
        Sha256: "a1b2c3d4e5f6...",
        FileName: "malware.exe",
        UserName: "Admin",
        IsFileFilter: true,
        IsNetworkFilter: false,
        IsUserFilter: false,
        HostsGroupsStr: "All",
        Status: 1,
        RemediationType: 2,
        RemediationMethod: 1,
        RemediationParams: "{}",
        CreatedDate: new Date().toISOString(),
        UpdatedDate: new Date().toISOString(),
        RemediationMethodType: 0,
        DynamicRemediationTemplateId: 0,
        DynamicRemediationTemplateName: "Default",
        IsEnabled: true,
        RemediationAction: "Block"
    },
    AutoRemediationId: 500,
    ScanGroupName: "Daily Scan",
    EpsRemediationActionPerformed: 2, // Kill
    FirstSeenUtc: new Date().toISOString(),
    LastSeenUtc: new Date().toISOString(),
    EpsLastSeenLocal: new Date().toISOString(),
    EpsLastSeenUtc: new Date().toISOString(),
    ScanGuid: "guid-123-456",
    Modules: [],
    Tags: [],
    MitreDetails: []
});

// ניצור רשימה של 20 התראות דמו
const alertsList = Array.from({ length: 20 }, (_, i) => getSingleAlert(i + 1));

module.exports = {
    alertsList
};